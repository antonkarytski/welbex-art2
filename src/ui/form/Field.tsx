import { Event, Store } from 'effector'
import { useStoreMap } from 'effector-react'
import React from 'react'
import { KeyboardTypeOptions } from 'react-native'
import Input from '../input'
import { InputStyles } from '../input/styles'

type FieldChangePayload<T> = {
  value: string
  key: keyof T & string
}

type FieldProps<T> = {
  name: keyof T & string
  type?: KeyboardTypeOptions
  store: Store<T>
  setField: Event<FieldChangePayload<T>>
  placeholder?: string
  label?: string
  styles?: InputStyles
}

function Field<T>({
  name,
  placeholder,
  type = 'phone-pad',
  store,
  setField,
  label,
  styles,
  ...props
}: FieldProps<T>) {
  const value = useStoreMap({
    store,
    keys: [name],
    fn: (form) => form[name]?.toString() || '',
  })

  const onFieldChange = (data: FieldChangePayload<T>) => setField(data)

  return (
    <Input
      onChangeText={(text) => onFieldChange({ value: text, key: name })}
      value={value}
      placeholder={placeholder}
      label={label}
      styles={styles}
      type={type}
      {...props}
    />
  )
}

export default Field
