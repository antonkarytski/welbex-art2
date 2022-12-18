import React from 'react'
import { StyleSheet } from 'react-native'
import Span, { SpanProps } from './Span'

const H1 = ({ style, ...props }: SpanProps) => {
  return <Span weight={600} style={[styles.text, style]} {...props} />
}

const styles = StyleSheet.create({
  text: {
    fontSize: 36,
    marginVertical: 36,
  },
})

export default H1
