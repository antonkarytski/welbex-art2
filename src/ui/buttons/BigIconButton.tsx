import React, { PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'
import { defaultColors } from '../../features/themed/theme'
import Row from '../Row'
import Span from '../Span'
import PresetButton from './PresetButton'
import { BigIconButtonProps } from './types'

const BigIconButton = ({
  label,
  onPress,
  style,
  preset,
  disabled,
  children,
}: PropsWithChildren<BigIconButtonProps>) => {
  return (
    <PresetButton
      onPress={onPress}
      style={[styles.button, style?.button]}
      preset={preset}
      disabled={disabled}
    >
      {(presetState) => (
        <Row style={style?.row}>
          {children}
          {label && (
            <Span
              label={label}
              weight={500}
              style={[styles.label, { color: presetState.label }, style?.label]}
            />
          )}
        </Row>
      )}
    </PresetButton>
  )
}

const styles = StyleSheet.create({
  label: {
    marginLeft: 12,
    fontSize: 16,
    lineHeight: 21,
    color: defaultColors.text,
  },
  button: {
    paddingVertical: 14,
  },
})

export default BigIconButton
