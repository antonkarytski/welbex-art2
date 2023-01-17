import { Checkbox as BaseCheckBox } from 'native-base'
import React, { PropsWithChildren } from 'react'

type CheckboxProps = {
  label?: string
  value: string
  onChange: (checked: boolean) => void
  disabled?: boolean
  isInvalid?: boolean
  defaultIsChecked?: boolean
} & PropsWithChildren

const Checkbox = ({
  label = '',
  value,
  onChange,
  disabled,
  children,
  isInvalid,
  defaultIsChecked,
}: CheckboxProps) => {
  return (
    <BaseCheckBox
      value={value}
      onChange={onChange}
      isDisabled={disabled}
      isInvalid={isInvalid}
      defaultIsChecked={defaultIsChecked}
    >
      {children || label}
    </BaseCheckBox>
  )
}

export default Checkbox
