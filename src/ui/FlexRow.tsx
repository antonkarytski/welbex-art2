import React, { ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface FlexRowProp {
  children: ReactNode[]
  style?: StyleProp<ViewStyle>
}

const FlexRow = ({ children, style }: FlexRowProp) => {
  return <View style={[styles.container, style]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default FlexRow
