import { useEvent, useStore } from 'effector-react'
import React, { useRef } from 'react'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { defaultColors } from '../../features/themed/theme'
import Span from '../Span'
import Input from '../input'
import { PhoneInputProps } from './types'

const PhoneInput = ({
  label,
  disabled,
  phoneModel,
  placeholder = '( ___ ) ___ - __ - __',
  style,
  isValid,
}: PhoneInputProps) => {
  const setPhone = useEvent(phoneModel.purePhoneModel.set)
  const formattedPhone = useStore(phoneModel.$formattedPhone)
  const inputRef = useRef<TextInput>(null)

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.wrapper,
        !isValid && isValid !== undefined && styles.wrapper__invalid,
        style?.wrapper,
      ]}
      onPress={() => inputRef.current?.focus()}
    >
      {!formattedPhone.startsWith('+') && (
        <Span label={'+'} style={styles.plus} />
      )}
      <Input
        label={label}
        value={formattedPhone}
        onChangeText={setPhone}
        disabled={disabled}
        placeholder={placeholder}
        styles={{ ...inputStyles, ...style?.input }}
        ref={inputRef}
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
  wrapper__invalid: {
    borderColor: '#E75958',
  },
  plus: {
    fontSize: 16,
  },
})

const inputStyles = StyleSheet.create({
  input: {
    paddingVertical: 14,
    paddingHorizontal: 5,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  input__focused: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
})

export default PhoneInput
