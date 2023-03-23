import React from 'react'
import {
  useFieldValidation,
  useSpecificTypeFormField,
} from '../../lib/models/form/hooks'
import DateInput from '../DateInput'
import { FieldProps } from './_types'

type DateFieldProps = {
  placeholder?: string
  maximumDate?: Date
  displayDefaultDate?: boolean
}

const DateField = <T extends Record<string, any>, N extends keyof T>({
  name,
  formModel,
  validateOnBlur,
  displayDefaultDate,
  ...props
}: FieldProps<T, N, Date> & DateFieldProps) => {
  const [value, setValue] = useSpecificTypeFormField<T, Date>(formModel, name)
  const validation = useFieldValidation(formModel, name)

  return (
    <DateInput
      isValid={validation?.isValid}
      date={value}
      defaultDate={displayDefaultDate ? value : undefined}
      onChange={setValue}
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
