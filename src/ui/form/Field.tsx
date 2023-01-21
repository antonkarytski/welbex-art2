import React from 'react'
import {
  FormFieldComponentProps,
  TypedFormFieldComponentProps,
  useFormField,
} from '../../lib/componentsModels/model.form'
import Input from '../input'
import { InputStyles } from '../input/styles'
import { InputProps } from '../input/types'

type FieldProps<T extends Record<string, any>, N extends keyof T> = {
  label?: string
  styles?: InputStyles
} & TypedFormFieldComponentProps<T, N, string> &
  InputProps

function Field<T extends Record<string, any>, N extends keyof T>({
  name,
  formModel,
  label,
  styles,
  ...props
}: FieldProps<T, N>) {
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
