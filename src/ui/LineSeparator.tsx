import React from 'react'
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import Row from './Row'
import Span from './Span'

type LineSeparatorProps = {
  label?: string
  style?: StyleProp<ViewStyle>
  styleLine?: StyleProp<ViewStyle>
  styleLabel?: StyleProp<TextStyle>
}

const LineSeparator = ({
  label,
  style,
  styleLine,
  styleLabel,
}: LineSeparatorProps) => {
  return (
    <Row style={[styles.lineWrapper, style]}>
      <View style={[styles.line, styleLine]} />
      {label && <Span style={[styles.label, styleLabel]}>{label}</Span>}
      <View style={[styles.line, styleLine]} />
    </Row>
  )
}

const styles = StyleSheet.create({
  lineWrapper: {
    width: '100%',
    marginVertical: 35,
  },
  label: {
    paddingHorizontal: 16,
  },
  line: {
    height: 1,
    flexGrow: 1,
    backgroundColor: '#B2BEBD',
  },
})

export default LineSeparator
