import React from 'react'
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Fn } from '../../types'
import Row from '../Row'
import Span from '../Span'
import AppleIcon from '../icons/Icon.Apple'
import PresetButton from './PresetButton'

type AppleButtonProps = {
  label?: string
  onPress: Fn
  style?: StyleProp<ViewStyle>
  styleIcon?: StyleProp<ViewStyle>
  styleLabel?: StyleProp<TextStyle>
}

const AppleButton = ({
  label,
  onPress,
  style,
  styleIcon,
  styleLabel,
}: AppleButtonProps) => {
  return (
    <PresetButton onPress={onPress} style={style}>
      {() => (
        <Row>
          <AppleIcon size={24} style={styleIcon} />
          {label && (
            <Span label={label} style={[styles.labelMargin, styleLabel]} />
          )}
        </Row>
      )}
    </PresetButton>
  )
}

const styles = StyleSheet.create({
  labelMargin: {
    marginLeft: 12,
  },
})

export default AppleButton
