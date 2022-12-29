import { useStoreMap } from 'effector-react'
import React from 'react'
import { KeyboardTypeOptions } from 'react-native'
import { FormModel } from '../../lib/componentModels/model.form'
import Input from '../input'
import { InputStyles } from '../input/styles'

type FieldProps<T extends Record<string, string>> = {
  name: keyof T
  type?: KeyboardTypeOptions
  formModel: FormModel<T>
  placeholder?: string
  label?: string
  styles?: InputStyles
}

function Field<T extends Record<string, string>>({
  name,
  placeholder,
  type = 'phone-pad',
  formModel,
  label,
  styles,
  ...props
}: FieldProps<T>) {
  const { $store, setField } = formModel
  const value = useStoreMap({
    store: $store,
    keys: [name],
    fn: (form) => form[name]?.toString() || '',
  })

  return (
    <Input
      onChangeText={(text) => setField({ value: text, key: name })}
      value={value}
      placeholder={placeholder}
      label={label}
      styles={styles}
      type={type}
      {...props}
    />
  )
}

export default Field
