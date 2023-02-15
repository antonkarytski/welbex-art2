import { useEvent, useStore } from 'effector-react'
import React, { useRef, useState } from 'react'
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native'
import { defaultColors } from '../../features/themed/theme'
import Input from '../input'
import { PhoneInputProps } from './types'

const PhoneInput = ({
  label,
  disabled,
  phoneModel,
  placeholder = '( ___ ) ___ - __ - __',
  style,
  isValid,
  focused,
  onBlur,
  onFocus,
}: PhoneInputProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const setPhone = useEvent(phoneModel.purePhoneModel.set)
  const formattedPhone = useStore(phoneModel.$formattedPhone)
  const inputRef = useRef<TextInput>(null)

  const handleFocus: TextInputProps['onFocus'] = (e) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur: TextInputProps['onBlur'] = (e) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.wrapper,
        style?.wrapper,
        isValid === false && styles.wrapper__invalid,
        (focused || (isFocused && focused !== undefined)) &&
          styles.wrapper__focused,
      ]}
      onPress={() => {
        inputRef.current?.focus()
        setIsFocused(true)
      }}
    >
      <Input
        label={label}
        value={formattedPhone}
        onChangeText={setPhone}
        disabled={disabled}
        placeholder={placeholder}
        styles={{ ...inputStyles, ...style?.input }}
        onBlur={handleBlur}
        onFocus={handleFocus}
        type={'phone-pad'}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: defaultColors.formFieldBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: defaultColors.inputBorder,
  },
  wrapper__focused: {
    borderColor: defaultColors.inputFocusedBorder,
    backgroundColor: '#ffffff',
  },
  wrapper__invalid: {
    borderColor: defaultColors.errorBorder,
  },
})

const inputStyles = StyleSheet.create({
  input: {
    paddingVertical: 14,
    paddingHorizontal: 2,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  input__focused: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
})

export default PhoneInput
