import React from 'react'
import { StyleSheet } from 'react-native'
import Row from '../Row'
import Span from '../Span'
import { NoteProps } from './_types'

const Note = ({ label, labelFontWeight = 400, style, children }: NoteProps) => {
  return (
    <Row style={[styles.row, style?.row]}>
      {children}
      {label && (
        <Span style={[styles.label, style?.label]} weight={labelFontWeight}>
          {label}
        </Span>
      )}
    </Row>
  )
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'flex-start',
  },
  label: {
    marginLeft: 8,
    fontSize: 14,
    lineHeight: 21,
  },
})

export default Note
