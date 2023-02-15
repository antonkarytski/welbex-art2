import React, { ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

type DropdownContainerProps = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const DropdownContainer = ({ style, children }: DropdownContainerProps) => {
  return (
    <View style={[styles.shadow, styles.container, style]}>
      <View style={[styles.innerContainer]}>{children}</View>
    </View>
  )
}

export default DropdownContainer

const styles = StyleSheet.create({
  innerContainer: {
    borderRadius: 8,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  container: {
    borderRadius: 8,
    width: 200,
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
