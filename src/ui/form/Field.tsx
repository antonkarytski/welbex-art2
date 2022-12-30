import React from 'react'
import {
  FormFieldComponentProps,
  useFormField,
} from '../../lib/componentsModels/model.form'
import Input from '../input'
import { InputProps } from '../input/Input'
import { InputStyles } from '../input/styles'

type FieldProps<T extends Record<string, string>> = {
  label?: string
  styles?: InputStyles
} & FormFieldComponentProps<T> &
  InputProps

function Field<T extends Record<string, string>>({
  name,
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
      label={label}
      styles={styles}
      {...props}
    />
  )
}

export default Field
