import React from 'react'
import { StyleSheet } from 'react-native'
import Span, { SpanProps } from './Span'

const H2 = ({ style, ...props }: SpanProps) => {
  return <Span weight={600} style={[styles.text, style]} {...props} />
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginVertical: 24,
  },
})

export default H2
