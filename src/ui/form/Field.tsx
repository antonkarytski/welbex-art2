import { useStoreMap } from 'effector-react'
import React from 'react'
import { KeyboardTypeOptions } from 'react-native'
import {
  FormFieldComponentProps,
  FormModel,
  useFormField,
} from '../../lib/componentsModels/model.form'
import Input from '../input'
import { InputStyles } from '../input/styles'

type FieldProps<T extends Record<string, string>> = {
  type?: KeyboardTypeOptions
  placeholder?: string
  label?: string
  styles?: InputStyles
} & FormFieldComponentProps<T>

function Field<T extends Record<string, string>>({
  name,
  placeholder,
  type = 'phone-pad',
  formModel,
  label,
  styles,
  ...props
}: FieldProps<T>) {
  const [value, setValue] = useFormField(formModel, name)

  return (
    <Input
      onChangeText={setValue}
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
