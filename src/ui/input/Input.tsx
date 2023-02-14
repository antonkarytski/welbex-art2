import React, { forwardRef, useState } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import Span from '../Span'
import { inputStyles, placeholderColor } from './styles'
import { InputProps } from './types'

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
      ...props
    }: InputProps,
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const handleFocus: TextInputProps['onFocus'] = (e) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const isInvalid = isValid === false

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
              onChangeText={onChangeText}
              onFocus={handleFocus}
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
