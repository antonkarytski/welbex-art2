import React, { ReactElement } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

type SelectedLayoutProps = {
  isVisible: boolean
  onPress?: () => void
  children: ReactElement
}

const SelectedLayout = ({
  isVisible,
  onPress,
  children,
}: SelectedLayoutProps) => {
  if (!isVisible) return children

  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) onPress()
      }}
      style={styles.layout}
    >
      {children}
    </TouchableOpacity>
  )
}

export default SelectedLayout

const styles = StyleSheet.create({
  layout: {
    backgroundColor: '#00000070',
  },
})
