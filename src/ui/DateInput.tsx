import React, { useRef, useState } from 'react'
import { StyleProp, TextInput, ViewStyle } from 'react-native'
import DatePicker, { DatePickerProps } from 'react-native-date-picker'
import Input from './input'
import { InputStyles } from './input/types'

type DateInputProps = {
  placeholder?: string
  setDate: (date: Date) => void
  styles?: InputStyles
  style?: StyleProp<ViewStyle>
} & DatePickerProps

const DateInput = ({
  placeholder,
  date,
  setDate,
  styles,
  ...props
}: DateInputProps) => {
  const [open, setOpen] = useState(false)
  const [isDateSelected, setIsDateSelected] = useState(false)
  const ref = useRef<TextInput>(null)

  const handleConfirmDate: DateInputProps['onConfirm'] = (newDate) => {
    setOpen(false)
    setDate(newDate)
    setIsDateSelected(true)
    props.onConfirm?.(newDate)
  }

  return (
    <>
      <Input
        placeholder={placeholder}
        value={isDateSelected ? date.toLocaleDateString() : undefined}
        onPressIn={() => {
          ref.current?.focus()
          setOpen(true)
        }}
        ref={ref}
        styles={styles}
      />
      <DatePicker
        modal
        mode={props?.mode || 'date'}
        open={open}
        date={date}
        onConfirm={handleConfirmDate}
        onCancel={() => {
          setOpen(false)
          props.onCancel?.()
        }}
        {...props}
      />
    </>
  )
}

export default DateInput
