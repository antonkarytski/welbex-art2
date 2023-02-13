import React from 'react'
import {
  useFieldValidation,
  useSpecificTypeFormField,
} from '../../lib/models/form/hooks'
import DateInput from '../DateInput'
import { FieldProps } from './_types'

const DateField = <T extends Record<string, any>, N extends keyof T>({
  name,
  formModel,
  ...props
}: FieldProps<T, N, Date>) => {
  const [value, setValue] = useSpecificTypeFormField<T, Date>(formModel, name)
  const isValid = useFieldValidation(formModel, name)

  return (
    <DateInput
      date={value}
      onChange={setValue}
      maximumDate={new Date()}
      {...props}
    />
  )
}

export default DateField
