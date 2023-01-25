import { Checkbox as BaseCheckBox, Icon } from 'native-base'
import React, { PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'
import OkIcon from './icons/Icon.Ok'

type CheckboxProps = PropsWithChildren<{
  label?: string
  value: string
  onChange: (checked: boolean) => void
  disabled?: boolean
  isInvalid?: boolean
  defaultIsChecked?: boolean
  iconSize?: number
  iconColor?: string
}>

const Checkbox = ({
  label = '',
  value,
  onChange,
  disabled,
  children,
  isInvalid,
  defaultIsChecked,
  iconSize = 12,
  iconColor = '#ffffff',
}: CheckboxProps) => {
  return (
    <BaseCheckBox
      value={value}
      onChange={onChange}
      isDisabled={disabled}
      isInvalid={isInvalid}
      defaultIsChecked={defaultIsChecked}
      icon={<Icon as={<OkIcon size={iconSize} color={iconColor} />} />}
      style={styles.checkbox}
      // colorScheme={'#347B81'}
    >
      {children || label}
    </BaseCheckBox>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    // width: 16,
    // hight: 16,
  },
})

export default Checkbox
