import { useCallback, useState } from 'react'

/**
 * 自定义更新钩子
 * @description 用于手动触发, 强制更新
 * @returns Fn
 */
function useUpdate(): () => void {
  const [, update] = useState({})
  return useCallback(() => update({}), [])
}

export default useUpdate
