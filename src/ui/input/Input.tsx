import React, { forwardRef, useState } from 'react'
import { TextInput, View } from 'react-native'
import Span from '../Span'
import { inputStyles, placeholderColor } from './styles'
import { InputProps } from './types'

function removeFromEnd(value: string, valueToRemove: string) {
  if (value.endsWith(valueToRemove)) {
    return value.slice(0, value.length - valueToRemove.length)
  }
  return value
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      onChangeText,
      type,
      label,
      children,
      isValid,
      disabled,
      styles,
      InputPseudoBefore,
      InputPseudoAfter,
      onBlur,
      postfix,
      onFocus,
      value,
      ...props
    }: InputProps,
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const isInvalid = isValid === false

    const fullValue = postfix && value && !isFocused ? value + postfix : value

    return (
      <View style={styles?.container}>
        {label && (
          <Span style={[inputStyles.label, styles?.label]}>{label}</Span>
        )}
        <View style={[inputStyles.wrapper, styles?.wrapper]}>
          <View
            style={[
              inputStyles.inputWrapper,
              styles?.inputWrapper,
              styles?.pseudoBefore,
            ]}
          >
            {InputPseudoBefore && (
              <View style={[inputStyles.inputPseudo, inputStyles.pseudoBefore]}>
                {InputPseudoBefore}
              </View>
            )}
            <TextInput
              ref={ref}
              keyboardType={type}
              onChangeText={
                !postfix || isFocused
                  ? onChangeText
                  : (text) => {
                      const newValue = removeFromEnd(text, postfix)
                      onChangeText?.(newValue)
                    }
              }
              onFocus={(e) => {
                setIsFocused(true)
                onFocus?.(e)
              }}
              onBlur={(e) => {
                setIsFocused(false)
                onBlur?.(e)
              }}
              editable={!disabled}
              style={[
                inputStyles.input,
                inputStyles.border,
                !!InputPseudoBefore && inputStyles.input__pseudoBefore,
                !!InputPseudoAfter && inputStyles.input__pseudoAfter,
                styles?.input,
                isFocused && [
                  inputStyles.input__focused,
                  styles?.input__focused,
                ],
                isInvalid && [inputStyles.input__invalid, styles?.invalid],
                isValid && [inputStyles.input__valid, styles?.valid],
                disabled && inputStyles.input__disabled,
              ]}
              placeholderTextColor={placeholderColor}
              value={fullValue}
              {...props}
            />
            {InputPseudoAfter && (
              <View
                style={[
                  inputStyles.inputPseudo,
                  inputStyles.pseudoAfter,
                  styles?.pseudoAfter,
                ]}
              >
                {InputPseudoAfter}
              </View>
            )}
          </View>
          {children}
        </View>
      </View>
    )
  }
)

export default Input
