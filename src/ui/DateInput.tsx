import React, { useRef, useState } from 'react'
import { StyleProp, TextInput, ViewStyle } from 'react-native'
import DatePicker, { DatePickerProps } from 'react-native-date-picker'
import Input from './input'
import { InputStyles } from './input/types'

type DateInputProps = {
  placeholder?: string
  onChange: (date: Date) => void
  style?: InputStyles
  pickerStyle?: StyleProp<ViewStyle>
  isValid?: boolean | null
  onBlur?: () => void
} & Omit<DatePickerProps, 'style' | 'onBlur'>

const DateInput = ({
  placeholder,
  date,
  onChange,
  style,
  pickerStyle,
  isValid,
  onBlur,
  ...props
}: DateInputProps) => {
  const [open, setOpen] = useState(false)
  const [isDateSelected, setIsDateSelected] = useState(false)
  const ref = useRef<TextInput>(null)

  const handleConfirmDate: DateInputProps['onConfirm'] = (newDate) => {
    setOpen(false)
    onChange(newDate)
    setIsDateSelected(true)
    props.onConfirm?.(newDate)
  }

  return (
    <>
      <Input
        onBlur={onBlur}
        isValid={isValid}
        placeholder={placeholder}
        value={isDateSelected ? date.toLocaleDateString() : undefined}
        onPressIn={() => {
          ref.current?.focus()
          setOpen(true)
        }}
        ref={ref}
        styles={style}
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
        style={pickerStyle}
        {...props}
      />
    </>
  )
}

export default DateInput
