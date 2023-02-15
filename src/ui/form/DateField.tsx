import React from 'react'
import {
  useFieldValidation,
  useSpecificTypeFormField,
} from '../../lib/models/form/hooks'
import DateInput from '../DateInput'
import { FieldProps } from './_types'

type DateFieldProps = {
  placeholder?: string
}

const DateField = <T extends Record<string, any>, N extends keyof T>({
  name,
  formModel,
  validateOnBlur,
  ...props
}: FieldProps<T, N, Date> & DateFieldProps) => {
  const [value, setValue] = useSpecificTypeFormField<T, Date>(formModel, name)
  const validation = useFieldValidation(formModel, name)

  return (
    <DateInput
      isValid={validation?.isValid}
      date={value}
      onChange={setValue}
      maximumDate={new Date()}
      onBlur={() => {
        if (!validateOnBlur) return
        if (!value) return formModel.validation.resetField(name)
        formModel.validation.castField(name)
      }}
      {...props}
    />
  )
}

export default DateField
