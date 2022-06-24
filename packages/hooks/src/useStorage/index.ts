import Taro from '@tarojs/taro'
import { Dispatch, useCallback, useEffect, useMemo, useState } from 'react'

interface IOpt<T> {
  t: number // 过期时间 单位s
  def: T // 默认值
}

/**
 * storage缓存hooks
 * 支持过期时间
 * @returns
 */
const useStorage = <T extends unknown>(
  k: string,
  opt: Partial<IOpt<T>> = { t: 0, def: undefined }
): [T, Dispatch<T>, Dispatch<T>] => {
  const key = `private_storage_key_${k}`
  const [value, setValue] = useState(opt.def)

  useEffect(() => {
    const _storage = Taro.getStorageSync(key)
    if (!_storage) return
    // 如果过期则移除storage
    if (Date.now() > JSON.parse(_storage).expireAt) Taro.removeStorageSync(key)
    const newValue = JSON.parse(_storage).v
    // 缓存更新时 设置value
    if (JSON.stringify(value) !== JSON.stringify(newValue)) setValue(newValue)
  })

  /** 设置storage */
  const setItem = useCallback((v: T) => {
    setValue(v)
    let expireAt = 0
    if (opt.t) expireAt = Date.now() + opt.t * 1000
    Taro.setStorageSync(
      key,
      JSON.stringify({
        v,
        expireAt,
      })
    )
  }, [])

  /** 移除storage */
  const removeItem = useCallback(() => {
    Taro.removeStorageSync(key)
    setValue(opt.def)
  }, [])

  const item = useMemo(() => {
    const _storage = Taro.getStorageSync(key)
    const newStorage = _storage && JSON.parse(_storage)
    if (!newStorage) return value
    // 未设置过期时间或在有效期内返回值
    if (newStorage.expireAt === 0 || Date.now() < newStorage.expireAt) return newStorage.v
    // 过期则清理
    removeItem()
    return value
  }, [value])

  return [item, setItem, removeItem]
}

export default useStorage
