import { useNavigation } from '@react-navigation/native'
import { useStore } from 'effector-react'
import React, { useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import { $cameraTask } from '../features/camera/model'
import NavigationBackButton from '../navigation/elements/NavigationButton.Back'
import { links } from '../navigation/links'
import CameraButton from '../ui/buttons/Button.Camera'

const CameraScreen = () => {
  const task = useStore($cameraTask)
  const ref = useRef<Camera | null>(null)
  const navigation = useNavigation()
  const devices = useCameraDevices('wide-angle-camera')
  const device = devices.back

  if (device == null) {
    return <View style={[StyleSheet.absoluteFill, styles.background]} />
  }

  const onPressPhoto = async () => {
    if (!task || !ref.current) return
    try {
      const photo = await ref.current.takePhoto()
      task.onPhoto(photo)
      const currentState = navigation.getState()
      if (currentState.routes[currentState.index]?.name === links.camera) {
        navigation.goBack()
      }
    } catch {}
  }

  return (
    <>
      <Camera
        ref={ref}
        style={[StyleSheet.absoluteFill, styles.background]}
        photo
        device={device}
        isActive
      />
      <NavigationBackButton style={styles.backButton} />
      <CameraButton onPress={onPressPhoto} style={styles.photoButton} />
    </>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 25,
  },
  photoButton: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    transform: [{ translateX: -30 }],
  },
})

export default CameraScreen
