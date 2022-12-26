import React from 'react'
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native'
import Span from './Span'

interface SupProps {
  label: string
  supLabel: string
  styleLabel?: StyleProp<TextStyle>
  styleSup?: StyleProp<TextStyle>
}

const Sup = ({ label, supLabel, styleLabel, styleSup }: SupProps) => {
  return (
    <View style={styles.wrapper}>
      <Span style={[styles.label, styleLabel]}>{label}</Span>
      <Span style={[styles.sup, styleSup]}>{supLabel}</Span>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  sup: {
    fontSize: 12,
    lineHeight: 12,
  },
  label: {
    fontSize: 18,
  },
})

export default Sup
