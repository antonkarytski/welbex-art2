import React from 'react'
import {
  useFieldValidation,
  useSpecificTypeFormField,
} from '../../lib/models/form'
import Input from '../input'
import { InputProps } from '../input/types'
import { FieldProps } from './_types'

const Field = <T extends Record<string, any>, N extends keyof T>({
  name,
  formModel,
  style,
  validateOnBlur,
  onBlur,
  ...props
}: FieldProps<T, N, string> & Omit<InputProps, 'style'>) => {
  const [value, setValue] = useSpecificTypeFormField<T, string>(formModel, name)
  const validation = useFieldValidation(formModel, name)

  return (
    <Input
      onChangeText={(text) => {
        setValue(text)
        formModel.validation.resetField(name)
      }}
      value={value}
      styles={style}
      onBlur={(e) => {
        if (validateOnBlur) {
          if (!value) return formModel.validation.resetField(name)
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
