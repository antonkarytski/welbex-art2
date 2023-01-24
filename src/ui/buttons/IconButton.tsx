import React, { PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'
import Row from '../Row'
import Span from '../Span'
import PresetButton from './PresetButton'
import { IconButtonProps } from './types'

const IconButton = ({
  label,
  onPress,
  style,
  preset,
  disabled,
  children,
}: PropsWithChildren<IconButtonProps>) => {
  return (
    <PresetButton
      onPress={onPress}
      style={style?.button}
      preset={preset}
      disabled={disabled}
    >
      <Row style={style?.row}>
        {children}
        {label && (
          <Span
            label={label}
            weight={500}
            style={[styles.label, style?.label]}
          />
        )}
      </Row>
    </PresetButton>
  )
}

const styles = StyleSheet.create({
  label: {
    marginLeft: 12,
    fontSize: 16,
    lineHeight: 21,
  },
})

export default IconButton
