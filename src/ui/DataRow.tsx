import React from 'react'
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native'
import Span from './Span'

type DataRowProps = {
  title: string
  value: string
  textStyle?: StyleProp<TextStyle>
}

const DataRow = ({ title, value, textStyle }: DataRowProps) => {
  return (
    <View style={styles.container}>
      <Span style={textStyle} weight={600} label={title} />
      <Span weight={500} style={textStyle} label={value} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default DataRow
