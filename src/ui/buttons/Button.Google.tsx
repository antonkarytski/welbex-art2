import React from 'react'
import { StyleSheet } from 'react-native'
import Row from '../Row'
import Span from '../Span'
import GoogleIcon from '../icons/Icon.Google'
import PresetButton from './PresetButton'
import { IconButtonProps } from './types'

const GoogleButton = ({ label, onPress, styles, preset }: IconButtonProps) => {
  return (
    <PresetButton onPress={onPress} style={styles?.button} preset={preset}>
      {() => (
        <Row style={styles?.row}>
          <GoogleIcon size={24} style={styles?.icon} />
          {label && (
            <Span
              label={label}
              style={[googleButtonStyles.labelMargin, styles?.label]}
            />
          )}
        </Row>
      )}
    </PresetButton>
  )
}

const googleButtonStyles = StyleSheet.create({
  labelMargin: {
    marginLeft: 12,
  },
})

export default GoogleButton
