import React, { ReactNode, forwardRef, useState } from 'react'
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
  InputPseudoBefore?: ReactNode
  InputPseudoAfter?: ReactNode
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
      InputPseudoBefore,
      InputPseudoAfter,
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
              onBlur={handleBlur}
              editable={!disabled}
              style={[
                inputStyles.input,
                inputStyles.border,
                Boolean(InputPseudoBefore) && inputStyles.input__pseudoBefore,
                Boolean(InputPseudoAfter) && inputStyles.input__pseudoAfter,
                styles?.input,
                isFocused && [
                  inputStyles.input__focused,
                  styles?.input__focused,
                ],
                isInvalid && inputStyles.input__invalid,
                isValid && inputStyles.input__valid,
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
      </>
    )
  }
)

export default Input
