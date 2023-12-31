import React, { useRef, useState } from 'react'
import { StyleProp, StyleSheet, TextInput, ViewStyle } from 'react-native'
import DatePicker, { DatePickerProps } from 'react-native-date-picker'
import { defaultColors } from '../features/themed/theme'
import { FONT_MEDIUM } from '../styles/fonts'
import Span from './Span'
import Input from './input'
import { MergedInputStyles } from './input/types'

type DateInputProps = {
  disabled?: boolean
  placeholder?: string
  onChange: (date: Date) => void
  style?: MergedInputStyles
  pickerStyle?: StyleProp<ViewStyle>
  isValid?: boolean | null
  onBlur?: () => void
  label?: string
  defaultDate?: Date
  wasSelected?: boolean
} & Omit<DatePickerProps, 'style' | 'onBlur'>

const DateInput = ({
  placeholder,
  date,
  onChange,
  style,
  pickerStyle,
  isValid,
  onBlur,
  label,
  defaultDate,
  wasSelected,
  disabled,
  ...props
}: DateInputProps) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<TextInput>(null)

  const handleConfirmDate: DateInputProps['onConfirm'] = (newDate) => {
    setOpen(false)
    onChange(newDate)
    props.onConfirm?.(newDate)
  }

  const inputValue =
    defaultDate?.toLocaleDateString() || wasSelected
      ? date.toLocaleDateString()
      : undefined

  return (
    <>
      {label && <Span label={label} style={[styles.label, style?.label]} />}
      <Input
        disabled={disabled}
        onBlur={onBlur}
        isValid={isValid}
        placeholder={placeholder}
        showSoftInputOnFocus={false}
        value={inputValue}
        onPressIn={() => {
          if (disabled) return
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
        date={date ?? defaultDate}
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

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    color: defaultColors.inputTitle,
    fontSize: 14,
    fontFamily: FONT_MEDIUM,
  },
})

export default DateInput
