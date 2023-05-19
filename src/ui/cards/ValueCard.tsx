import React from 'react'
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import Span from '../Span'

type ValueCardProps = {
  value: string | number
  title: string
  style?: StyleProp<ViewStyle>
  textStyle?: {
    value?: StyleProp<TextStyle>
    label?: StyleProp<TextStyle>
  }
}

const ValueCard = ({ style, textStyle, value, title }: ValueCardProps) => {
  return (
    <View style={[styles.container, style]}>
      <Span
        label={value}
        weight={600}
        style={[styles.value, textStyle?.value]}
      />
      <Span
        label={title}
        style={textStyle?.label}
        weight={400}
        adjustsFontSizeToFit
        numberOfLines={1}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    marginBottom: 4,
  },
})

export default ValueCard
