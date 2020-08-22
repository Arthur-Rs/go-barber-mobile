import React, {
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useState,
} from 'react'
import { TextInputProps, TextInput as ReactTextInput } from 'react-native'

import { Container, TextInput, Icon } from './styles'
import { useField } from '@unform/core'

interface InputProps extends TextInputProps {
  name: string
  icon: string
}

interface InputReference {
  value: string
}

interface InputComponent extends ReactTextInput {
  focus()
}

interface InputRef {
  focus(): void
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const InputElementRef = useRef<InputComponent>(null)
  const { fieldName, defaultValue = '', error, registerField } = useField(name)
  const valueRef = useRef<InputReference>({ value: defaultValue })

  const [isFocus, setIsFocus] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: valueRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  useImperativeHandle(ref, () => ({
    focus() {
      InputElementRef.current?.focus()
    },
  }))

  const handleChangeInputText = useCallback(value => {
    valueRef.current.value = value
  }, [])

  const handleInputFocus = useCallback(() => {
    setIsFocus(true)
    setIsFilled(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocus(false)

    const { value } = valueRef.current

    setIsFilled(!!value)
  }, [])

  return (
    <Container isFocus={isFocus} isErrored={!!error}>
      <Icon name={icon} size={20} color={isFilled ? '#ff9000' : '#666360'} />

      <TextInput
        ref={InputElementRef}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        placeholderTextColor="#666360"
        keyboardAppearance="dark"
        onChangeText={handleChangeInputText}
        {...rest}
      />
    </Container>
  )
}

export default forwardRef(Input)
