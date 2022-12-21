import { useStoreMap } from 'effector-react'
import React from 'react'
import { KeyboardTypeOptions, StyleProp, ViewStyle } from 'react-native'
import Input from '../../ui/input'
import { $signUpForm, SetFieldPayload, setField } from './model'
import { ISignUpForm } from './types'

interface FieldProps {
  name: keyof ISignUpForm
  placeholder: string
  style?: StyleProp<ViewStyle>
  type?: KeyboardTypeOptions
}

const Field = ({
  name,
  placeholder,
  style,
  type = 'phone-pad',
}: FieldProps) => {
  const value = useStoreMap({
    store: $signUpForm,
    keys: [name],
    fn: (form) => form[name]?.toString() || '',
  })

  const onFormFieldChange = setField.prepend(
    ({ value, key }: SetFieldPayload) => ({
      key,
      value,
    })
  )
  return (
    <Input
      placeholder={placeholder}
      onChangeText={(text) => onFormFieldChange({ value: text, key: name })}
      value={value}
      styleInput={style}
      type={type}
    />
  )
}

export default Field
