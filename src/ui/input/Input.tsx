import React, { forwardRef, useState } from 'react'
import {
	KeyboardTypeOptions,
	StyleProp,
	TextInput,
	TextInputProps,
	TextStyle,
	View,
	ViewStyle
} from 'react-native'
import { useThemedStyle, useThemeColors } from '../../features/themed/hooks'
import  Text  from '../text'
import { themedInputStyles } from './styles'

export type InputProps = {
  onChangeText?:(text: string) => void
  type?: KeyboardTypeOptions
  title?: string
  isInvalid?: boolean
  isValid?: boolean
  disabled?: boolean
  styleWrp?: StyleProp<ViewStyle>
  styleInput?: StyleProp<TextStyle>
  styleTitle?: StyleProp<TextStyle>
} & Omit<TextInputProps, 'onChange'>

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      onChangeText,
      styleWrp,
      type = 'phone-pad',
      styleInput,
      title,
      styleTitle,
      children,
      isInvalid,
      isValid,
      disabled,
      ...props
    },
    ref
	) => {
    const styles = useThemedStyle(themedInputStyles)
		const themeColors = useThemeColors()
    const [isFocused, setIsFocused] = useState(false)
    const handleFocus = () => {
      setIsFocused(true)
    }
    const handleBlur = () => {
      setIsFocused(false)
    }

    return (
      <>
        {title ? <Text style={[styles.title, styleTitle]} >{title}</Text> : null}
        <View style={[styles.container, styleWrp]}>
          <TextInput
            ref={ref}
            keyboardType={type}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={[
              styles.input,
              styles.border,
              isFocused &&  styles.input__focused,
              isInvalid && styles.input__invalid,
              isValid && styles.input__valid,
              disabled && styles.input__disabled,
              styleInput
            ]}
            placeholderTextColor={themeColors.placeholder}
            {...props}
          />
          {children}
        </View>
      </>
    )
  }
)

export default Input