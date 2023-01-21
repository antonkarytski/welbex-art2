import React from 'react'
import {
  TypedFormFieldComponentProps,
  useFormField,
} from '../../lib/componentsModels/model.form'
import Input from '../input'
import { InputStyles } from '../input/styles'
import { InputProps } from '../input/types'

type FieldProps<T extends Record<string, any>, N extends keyof T> = {
  label?: string
  style?: InputStyles
} & TypedFormFieldComponentProps<T, N, string> &
  InputProps

function Field<T extends Record<string, any>, N extends keyof T>({
  name,
  formModel,
  label,
  style,
  ...props
}: FieldProps<T, N>) {
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
