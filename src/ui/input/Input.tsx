import React, { forwardRef, useState } from 'react'
import {
  KeyboardTypeOptions,
  TextInput,
  TextInputProps,
  View,
} from 'react-native'
import Span from '../Span'
import { InputStyles, inputStyles, placeholderColor } from './styles'

export type InputProps = {
  onChangeText?: (text: string) => void
  type?: KeyboardTypeOptions
  label?: string
  isInvalid?: boolean
  isValid?: boolean
  disabled?: boolean
  styles?: InputStyles
} & Omit<TextInputProps, 'onChange'>

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      onChangeText,
      type = 'phone-pad',
      label,
      children,
      isInvalid,
      isValid,
      disabled,
      styles,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const handleFocus = () => {
      setIsFocused(true)
    }
    const handleBlur = () => {
      setIsFocused(false)
    }

    return (
      <>
        {label ? (
          <Span style={[inputStyles.label, styles?.label]}>{label}</Span>
        ) : null}
        <View style={[inputStyles.container, styles?.wrapper]}>
          <TextInput
            ref={ref}
            keyboardType={type}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!disabled}
            style={[
              inputStyles.input,
              inputStyles.border,
              styles?.input,
              isFocused && [inputStyles.input__focused, styles?.input__focused],
              isInvalid && inputStyles.input__invalid,
              isValid && inputStyles.input__valid,
              disabled && inputStyles.input__disabled,
            ]}
            placeholderTextColor={placeholderColor}
            {...props}
          />
          {children}
        </View>
      </>
    )
  }
)

export default Input
