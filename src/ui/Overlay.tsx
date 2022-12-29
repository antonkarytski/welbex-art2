import React from 'react'
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { FnExt } from '../types'

type OverlayProps = {
  onPress?: FnExt<GestureResponderEvent, void>
  backgroundColor?: string
}

const Overlay = ({ onPress, backgroundColor }: OverlayProps) => {
  const defaults = {
    backgroundColor: backgroundColor || 'transparent',
  }
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{
        ...styles.overlay,
        ...{
          backgroundColor: defaults.backgroundColor,
        },
      }}
    />
  )
}

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
  },
})

export default Overlay
