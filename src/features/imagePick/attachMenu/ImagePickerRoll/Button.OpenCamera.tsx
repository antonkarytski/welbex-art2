import React, { forwardRef } from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { RNCamera } from 'react-native-camera'
import { CameraIcon } from 'altek-ui'
import { useNavigate } from '../../../../navigation'
import { links } from '../../../../navigation/links'
import { CameraProps, ImageEditorResult } from '../../camera/types'
import { CELL_INNER_SIZE, cellsStyles } from './styles'

type OpenCameraButtonProps = {
  isAbleToLoadCamera?: boolean
  onPhoto: (uri: ImageEditorResult) => void
  cameraProps?: CameraProps
}

export const OpenCameraButton = forwardRef<RNCamera, OpenCameraButtonProps>(
  ({ isAbleToLoadCamera = true, onPhoto, cameraProps }, ref) => {
    const navigate = useNavigate()

    // const onPhotoAccept: NavigationTaskCallback<ImageEditorResult> = (props) => {
    //   attachMenu.hideSync()
    //   if (!props?.uri) return
    //   onPhoto(props)
    // }

    const onPress = () => {
      //addNavigationTask({ [links.camera]: { onAccept: onPhotoAccept } })
      //navigate(links.camera, cameraProps)
    }

    if (!isAbleToLoadCamera) {
      return (
        <View style={cellsStyles.container}>
          <OpenCameraWithoutPreview
            style={styles.solidButtonColor}
            onPress={onPress}
          />
        </View>
      )
    }

    return (
      <View style={cellsStyles.container}>
        <RNCamera
          ref={ref}
          type={RNCamera.Constants.Type.back}
          style={styles.camera}
          ratio={'1:1'}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          <OpenCameraWithoutPreview onPress={onPress} />
        </RNCamera>
      </View>
    )
  }
)

type OpenCameraWithoutPreviewProps = {
  style?: StyleProp<ViewStyle>
  onPress: () => void
}

function OpenCameraWithoutPreview({
  style,
  onPress,
}: OpenCameraWithoutPreviewProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.openCameraButton, style]}
    >
      <CameraIcon />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  openCameraButton: {
    width: CELL_INNER_SIZE,
    height: CELL_INNER_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  camera: {
    width: CELL_INNER_SIZE,
    height: CELL_INNER_SIZE,
  },
  solidButtonColor: {
    backgroundColor: '#000000',
  },
})
