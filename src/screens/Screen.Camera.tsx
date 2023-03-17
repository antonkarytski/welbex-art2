import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Camera, useCameraDevices } from 'react-native-vision-camera'

const CameraScreen = () => {
  const devices = useCameraDevices('wide-angle-camera')
  const device = devices.back

  if (device == null) return <View />
  return <Camera style={StyleSheet.absoluteFill} device={device} isActive />
}

export default CameraScreen
