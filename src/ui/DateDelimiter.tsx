import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

type DateDelimiterProps = {
  width?: number
  style?: StyleProp<ViewStyle>
  delimiterStyle?: StyleProp<ViewStyle>
}

const DateDelimiter = ({
  width = 10,
  style,
  delimiterStyle,
}: DateDelimiterProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.delimiter, delimiterStyle, { width }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  delimiter: {
    backgroundColor: '#000',
    height: 1,
  },
})

export default DateDelimiter
