import React from 'react'
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Fn } from '../../types'
import Row from '../Row'
import Span from '../Span'
import GoogleIcon from '../icons/Icon.Google'
import PresetButton from './PresetButton'
import { PresetButtonStates } from './types'

type GoogleButtonProps = {
  label?: string
  onPress: Fn
  style?: StyleProp<ViewStyle>
  styleIcon?: StyleProp<ViewStyle>
  styleLabel?: StyleProp<TextStyle>
  preset?: PresetButtonStates
}

const GoogleButton = ({
  label,
  onPress,
  style,
  styleIcon,
  styleLabel,
  preset,
}: GoogleButtonProps) => {
  return (
    <PresetButton onPress={onPress} style={style} preset={preset}>
      {() => (
        <Row>
          <GoogleIcon size={24} style={styleIcon} />
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

export default GoogleButton
