import React, { forwardRef, useState } from 'react'
import {
  KeyboardTypeOptions,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import Span from '../Span'
import { inputStyles, placeholderColor } from './styles'

export type InputProps = {
  onChangeText?: (text: string) => void
  type?: KeyboardTypeOptions
  label?: string
  isInvalid?: boolean
  isValid?: boolean
  disabled?: boolean
  styleWrp?: StyleProp<ViewStyle>
  styleInput?: StyleProp<TextStyle>
  styleInputFocused?: StyleProp<TextStyle>
  styleTitle?: StyleProp<TextStyle>
} & Omit<TextInputProps, 'onChange'>

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      onChangeText,
      styleWrp,
      type = 'phone-pad',
      styleInput,
      label,
      styleTitle,
      styleInputFocused,
      children,
      isInvalid,
      isValid,
      disabled,
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
          <Span style={[inputStyles.label, styleTitle]}>{label}</Span>
        ) : null}
        <View style={[inputStyles.container, styleWrp]}>
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
              styleInput,
              isFocused && [inputStyles.input__focused, styleInputFocused],
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
