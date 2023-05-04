import { useStore } from 'effector-react'
import React, { useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { CropView } from 'react-native-image-crop-tools'
import { useText } from '../../../translations/hook'
import ButtonArrow from '../../../ui/buttons/Button.Arrow'
import TextButton from '../../../ui/buttons/Button.Text'
import { prepareCameraPhotoPath } from '../../camera/helpers'
import { createThemedStyle } from '../../themed'
import { useTheme } from '../../themed/hooks'
import {
  $imageCropTask,
  ImageCropResultErrorCode,
  finishImageCropping,
} from './model'

const ImageCropper = () => {
  const text = useText()
  const ref = useRef<CropView>(null)
  const task = useStore($imageCropTask)
  const { styles, colors } = useTheme(themedStyles)

  if (!task) return null

  return (
    <View style={[[StyleSheet.absoluteFill, styles.container]]}>
      <ButtonArrow
        iconColor={colors.whiteText}
        style={{ button: styles.backButton }}
        onPress={() =>
          finishImageCropping({
            errorCode: ImageCropResultErrorCode.CANCELED_PICK,
          })
        }
      />
      <CropView
        ref={ref}
        style={styles.cropper}
        sourceUrl={prepareCameraPhotoPath(task.asset.uri)}
        onImageCrop={finishImageCropping}
      />
      <View style={styles.panel}>
        <TextButton
          label={text.cancelEditing}
          style={{
            button: styles.cancelButtonContainer,
            label: styles.cancelButton,
          }}
          onPress={() =>
            finishImageCropping({
              errorCode: ImageCropResultErrorCode.CANCELED_EDIT,
            })
          }
        />
        <TextButton
          label={text.done}
          style={{
            button: styles.doneButtonContainer,
            label: styles.doneButton,
          }}
          onPress={() => {
            ref.current?.saveImage()
          }}
        />
      </View>
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    cropper: {
      flex: 1,
    },
    backButton: {
      position: 'absolute',
      transform: [{ rotate: '180deg' }],
      zIndex: 21,
      left: 0,
      top: 25,
      width: 60,
    },
    container: {
      zIndex: 20,
      paddingBottom: 45,
      backgroundColor: '#202020',
    },
    cancelButton: {
      color: colors.whiteText,
    },
    cancelButtonContainer: {
      paddingLeft: 15,
      marginBottom: 10,
    },
    doneButton: {
      color: colors.primary1,
    },
    doneButtonContainer: {
      marginLeft: 'auto',
      paddingRight: 15,
      marginBottom: 10,
    },
    panel: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      width: '100%',
    },
  })
)

export default ImageCropper
