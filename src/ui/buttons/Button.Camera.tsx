import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

type ButtonCameraProps = {
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

const CameraButton = ({ style, onPress }: ButtonCameraProps) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress} />
  )
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
})

export default CameraButton
