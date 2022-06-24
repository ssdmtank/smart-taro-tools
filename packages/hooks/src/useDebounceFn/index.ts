import { useDidHide } from '@tarojs/taro'
import { useRef, useCallback, useEffect } from 'react'

/**
 * 防抖
 * @param func
 * @param wait
 * @param immediate
 * @returns
 */
function useDebounceFn(func: Function, wait: number, immediate: boolean) {
  const timeout = useRef<any>()
  /* 函数组件的this其实没啥多大的意义，这里我们就把this指向func好了 */
  const fnRef = useRef(func)
  /* 相关函数 func 可能会返回值，这里也要缓存 */
  const resultRef = useRef()

  /*  useDebounceFn 重新触发 func 可能会改变，这里做下更新 */
  useEffect(() => {
    fnRef.current = func
    return () => cancel()
  }, [func])

  // 跳转页面清除定时器
  useDidHide(() => {
    timeout.current = null
  })

  /**
   * 清除定时器
   */
  const cancel = useCallback(() => {
    timeout.current && clearTimeout(timeout.current)
  }, [])

  function resDebounced(...args: any) {
    // args就是事件对象event
    // 一直触发一直清除上一个打开的延时器
    cancel()

    if (immediate) {
      // 第一次触发，timeout===undefined恰好可以利用timeout的值
      const callNow = !timeout.current
      timeout.current = setTimeout(() => {
        timeout.current = null
      }, wait)
      /* this指向func好了 */
      if (callNow) resultRef.current = fnRef.current.apply(fnRef.current, args)
    } else {
      // 停止触发，只有最后一个延时器被保留
      timeout.current = setTimeout(() => {
        timeout.current = null
        // func绑定this和事件对象event，还差一个函数返回值
        resultRef.current = fnRef.current.apply(fnRef.current, args)
      }, wait)
    }
    return resultRef.current
  }

  return useCallback(resDebounced, [wait, cancel, immediate])
}
export default useDebounceFn
