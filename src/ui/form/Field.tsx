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
  validateOnBlur,
  onBlur,
  ...props
}: FieldProps<T, N, string>) => {
  const [value, setValue] = useSpecificTypeFormField<T, string>(formModel, name)
  const validation = useFieldValidation(formModel, name)
  console.log(name, validation)

  return (
    <Input
      onChangeText={(text) => {
        setValue(formatValue ? formatValue(text) : text)
        formModel.validation.resetField(name)
      }}
      value={value}
      label={label}
      styles={style}
      onBlur={(e) => {
        if (validateOnBlur) {
          formModel.validation.castField(name)
        }
        onBlur?.(e)
      }}
      isValid={validation?.isValid}
      {...props}
    />
  )
}

export default Field
