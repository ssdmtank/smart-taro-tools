import { useEffect, useRef } from 'react'

/**
 * 模拟onUnload生命周期 navigateBack／switchTab 时会调用
 * 参考https://zh-hans.reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies
 * @param fn 回调函数 fn(deps) （注：回调获取最新参数需通过deps）
 * @param deps 依赖参数对象
 */
const useUnload = (fn: Function, deps?: Object) => {
  const latestProps = useRef(deps)
  // 缓存依赖的参数
  useEffect(() => {
    latestProps.current = deps
  })

  // 卸载事件触发
  useEffect(
    () => () => {
      fn(latestProps.current)
    },
    []
  )
}
export default useUnload
