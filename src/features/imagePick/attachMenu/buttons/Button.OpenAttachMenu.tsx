import React from 'react'
import {
  Keyboard,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { AttachIcon } from 'altek-ui'
import { attachMenu } from '../model'

type OpenAttachMenuButtonProps = {
  style?: StyleProp<ViewStyle>
}

export default function OpenAttachMenuButton({
  style,
}: OpenAttachMenuButtonProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        Keyboard.dismiss()
        attachMenu.showSync()
      }}
      style={[styles.icon, style]}
      delayPressIn={0}
      delayPressOut={0}
    >
      <AttachIcon />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  icon: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
