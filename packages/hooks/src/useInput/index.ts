import { BaseEventOrig } from '@tarojs/components/types/common'
import { InputProps } from '@tarojs/components/types/Input'
import { TextareaProps } from '@tarojs/components/types/Textarea'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'

type inputValueType = BaseEventOrig<InputProps.inputEventDetail | TextareaProps.onInputEventDetail>
type useInputHook<T> = [
  { value: T; onInput: (val: inputValueType) => void },
  T,
  Dispatch<SetStateAction<T>>
]

/**
 * input 双向绑定
 * @param initialValue
 * @returns
 */
const useInput = (initialValue = ''): useInputHook<string> => {
  const [value, setValue] = useState(initialValue)
  const onInput = useCallback((e: inputValueType) => setValue(e.detail.value), [])
  return [{ value, onInput }, `${value}`.trim(), setValue]
}

export default useInput
