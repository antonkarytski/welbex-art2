import React from 'react'
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Fn } from '../../types'
import Row from '../Row'
import Span from '../Span'
import ArrowIcon from '../icons/Icon.Arrow'
import TextButton from './Button.Text'

type Style = {
  icon?: StyleProp<ViewStyle>
  buttonInnerWrapper?: StyleProp<ViewStyle>
  button?: StyleProp<ViewStyle>
  label?: StyleProp<TextStyle>
}

type ArrowButtonProps = {
  onPress: Fn
  label?: string
  style?: Style
  iconColor?: string
  iconSize?: number
  fontWeight?: number
}

const ArrowButton = ({
  onPress,
  style,
  iconColor,
  iconSize,
  label,
  fontWeight,
}: ArrowButtonProps) => {
  return (
    <TextButton
      onPress={onPress}
      style={{
        button: [styles.button, style?.button],
      }}
    >
      <Row style={[styles.buttonInnerWrapper, style?.buttonInnerWrapper]}>
        <Span label={label} style={style?.label} weight={fontWeight} />
        <ArrowIcon
          size={iconSize}
          color={iconColor}
          style={[styles.icon, style?.icon]}
        />
      </Row>
    </TextButton>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 8,
    transform: [{ rotate: '180deg' }],
  },
  buttonInnerWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default ArrowButton
