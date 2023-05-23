import React, { useState } from 'react'
import {
  useFieldValidation,
  useSpecificTypeFormField,
} from '../../lib/models/form'
import DateInput from '../DateInput'
import { FieldProps } from './_types'

type DateFieldProps = {
  disabled?: boolean
  placeholder?: string
  maximumDate?: Date
  displayDefaultDate?: boolean
  offValidation?: boolean
}

const DateField = <T extends Record<string, any>, N extends keyof T>({
  name,
  formModel,
  validateOnBlur,
  displayDefaultDate,
  offValidation,
  ...props
}: FieldProps<T, N, Date | null> & DateFieldProps) => {
  const [isSelected, setIsSelected] = useState(false)
  const [value, setValue] = useSpecificTypeFormField<T, Date | null>(
    formModel,
    name
  )
  const validation = useFieldValidation(formModel, name)

  if (value === null) return null
  return (
    <DateInput
      wasSelected={isSelected}
      isValid={
        validation?.isValid === null || offValidation
          ? null
          : validation?.isValid && isSelected
      }
      date={value}
      defaultDate={displayDefaultDate ? value : undefined}
      onChange={(date) => {
        setIsSelected(!!date)
        setValue(date)
      }}
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
