import React from 'react'
import {
  FormFieldComponentProps,
  useFormField,
} from '../../lib/componentsModels/model.form'
import Input from '../input'
import { InputStyles } from '../input/styles'
import { InputProps } from '../input/types'

type FieldProps<T extends Record<string, string>> = {
  label?: string
  style?: InputStyles
} & FormFieldComponentProps<T> &
  InputProps

function Field<T extends Record<string, string>>({
  name,
  formModel,
  label,
  style,
  ...props
}: FieldProps<T>) {
  const [value, setValue] = useFormField(formModel, name)

  return (
    <Input
      onChangeText={setValue}
      value={value}
      label={label}
      styles={style}
      {...props}
    />
  )
}

export default Field
