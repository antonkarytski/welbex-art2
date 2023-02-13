import React from 'react'
import {
  useFieldValidation,
  useSpecificTypeFormField,
} from '../../lib/models/form/hooks'
import Input from '../input'
import { FieldProps } from './_types'

const Field = <T extends Record<string, any>, N extends keyof T>({
  name,
  formModel,
  label,
  style,
  formatValue,
  ...props
}: FieldProps<T, N, string>) => {
  const [value, setValue] = useSpecificTypeFormField<T, string>(formModel, name)
  const isValid = useFieldValidation(formModel, name)

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
