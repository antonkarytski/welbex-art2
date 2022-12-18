import React from 'react'
import { StyleSheet } from 'react-native'
import Span, { SpanProps } from './Span'

const H3 = ({ style, ...props }: SpanProps) => {
  return <Span weight={600} style={[styles.text, style]} {...props} />
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginVertical: 12,
  },
})

export default H3
