import React, { forwardRef, useState } from 'react'
import { TextInput, View } from 'react-native'
import Span from '../Span'
import { inputStyles, placeholderColor } from './styles'
import { InputProps } from './types'

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      onChangeText,
      type = 'phone-pad',
      label,
      children,
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

    const isInvalid = isValid !== undefined && isValid !== null && !isValid

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
