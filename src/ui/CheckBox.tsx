import { Checkbox as BaseCheckBox } from 'native-base'
import React from 'react'

type CheckboxProps = {
  label?: string
  value: string
  onChange: (checked: boolean) => void
  disabled?: boolean
}

//* Component not completed !!
const Checkbox = ({ label = '', value, onChange, disabled }: CheckboxProps) => {
  return (
    <BaseCheckBox value={value} onChange={onChange}>
      {label}
    </BaseCheckBox>
  )
}

export default Checkbox
