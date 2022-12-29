import React from 'react'
import { StyleSheet } from 'react-native'
import Row from '../Row'
import Span from '../Span'
import AppleIcon from '../icons/Icon.Apple'
import PresetButton from './PresetButton'
import { IconButtonProps } from './types'

const AppleButton = ({
  label,
  onPress,
  styles,
  preset,
  disabled,
}: IconButtonProps) => {
  return (
    <PresetButton
      onPress={onPress}
      style={styles?.button}
      preset={preset}
      disabled={disabled}
    >
      {() => (
        <Row style={styles?.row}>
          <AppleIcon size={24} style={styles?.icon} />
          {label && (
            <Span
              label={label}
              style={[appleButtonStyles.labelMargin, styles?.label]}
            />
          )}
        </Row>
      )}
    </PresetButton>
  )
}

const appleButtonStyles = StyleSheet.create({
  labelMargin: {
    marginLeft: 12,
  },
})

export default AppleButton
