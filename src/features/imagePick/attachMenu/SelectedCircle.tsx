import React from 'react'
import { StyleSheet, View } from 'react-native'

type SelectedCircleProps = {
  isSelected: boolean
}

export function SelectedCircle({ isSelected }: SelectedCircleProps) {
  return (
    <View style={styles.circleContainer}>
      {isSelected ? <View style={styles.select} /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  circleContainer: {
    width: 14,
    height: 14,
    backgroundColor: 'transparent',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  select: {
    width: 8,
    height: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
  },
})
