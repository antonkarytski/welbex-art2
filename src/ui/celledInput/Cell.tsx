import React from 'react'
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { Cursor } from 'react-native-confirmation-code-field'
import Span from '../Span'

export type CellProps = {
  isFocused?: boolean
  symbol?: string
  onLayout: (event: LayoutChangeEvent) => void
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

export default function NumberCell({
  isFocused,
  symbol,
  onLayout,
  style,
  textStyle,
}: CellProps) {
  return (
    <View style={[styles.cell, isFocused && styles.cell__focused, style]}>
      <Span
        weight={500}
        style={[styles.cellText, textStyle]}
        onLayout={onLayout}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </Span>
    </View>
  )
}

const styles = StyleSheet.create({
  cell: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#F9FAF9',
    borderColor: '#D5DDDC',
  },

  cell__focused: {
    borderColor: '#347B81',
    backgroundColor: '#ffffff',
  },
  cellText: {
    lineHeight: 29,
    fontSize: 24,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
})
