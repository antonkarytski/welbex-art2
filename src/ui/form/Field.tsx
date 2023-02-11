import React from 'react'
import {
  TypedFormFieldComponentProps,
  useSpecificTypeFormField,
} from '../../lib/models/model.form'
import Input from '../input'
import { InputProps, InputStyles } from '../input/types'
import { FormatFieldValue } from './_types'

export type FieldProps<T extends Record<string, any>, N extends keyof T> = {
  label?: string
  style?: InputStyles
  formatValue?: FormatFieldValue
} & TypedFormFieldComponentProps<T, N, string> &
  Omit<InputProps, 'style'>

function Field<T extends Record<string, any>, N extends keyof T>({
  name,
  formModel,
  label,
  style,
  formatValue,
  ...props
}: FieldProps<T, N>) {
  const [value, setValue] = useSpecificTypeFormField<T, string>(formModel, name)

  return (
    <Input
      onChangeText={(text) => setValue(formatValue ? formatValue(text) : text)}
      value={value}
      label={label}
      styles={style}
      {...props}
    />
  )
}

export default Field
