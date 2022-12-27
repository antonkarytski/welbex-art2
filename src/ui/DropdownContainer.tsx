import React, { ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

type DropdownContainerProps = {
  children: ReactNode | ReactNode[]
  style?: StyleProp<ViewStyle>
}

const DropdownContainer = ({ style, children }: DropdownContainerProps) => {
  return (
    <View style={[styles.container, styles.shadow, style]}>{children}</View>
  )
}

export default DropdownContainer

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: '#ffffff',
    width: 150,
  },
  shadow: {
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.16,
    shadowRadius: 5,

    elevation: 5,
    zIndex: 5,
  },
})
