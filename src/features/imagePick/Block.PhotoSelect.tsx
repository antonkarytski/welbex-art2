import { ImagePickerAsset } from 'expo-image-picker'
import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import Span from '../../ui/Span'
import CameraIcon from '../../ui/icons/Icon.Camera'
import PopUpPhotoEditActionSelect from '../popUp/PopUp.PhotoEditActionSelect'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import { pickFromCameraRoll } from './pickFiles'
import { uploadBlockCommonStyles, uploadImageCardThemedStyle } from './styles'

export enum PhotoSelectSources {
  CAMERA = 1,
  GALLERY = 2,
}

type UploadFromCameraBlockProps = {
  label: string
  style?: StyleProp<ViewStyle>
  onPick?: (assets: ImagePickerAsset[]) => void
  sources?: PhotoSelectSources[]
}

const PhotoSelectBlock = ({
  label,
  style,
  onPick,
  sources = [PhotoSelectSources.CAMERA, PhotoSelectSources.GALLERY],
}: UploadFromCameraBlockProps) => {
  const { styles, colors } = useTheme(themedStyles)
  return (
    <TouchableOpacity
      onPress={() => {
        if (sources?.length > 1) {
          return PopUpPhotoEditActionSelect.showSync({
            props: {
              hideRemoveButton: true,
              onPick,
            },
          })
        }
        pickFromCameraRoll()
          .then((assets) => {
            if (assets) onPick?.(assets)
          })
          .catch(() => {})
      }}
      style={[styles.container, style]}
    >
      <View style={[uploadBlockCommonStyles.button, styles.button]}>
        <CameraIcon color={colors.text} />
      </View>
      <View style={uploadBlockCommonStyles.textBlock}>
        <Span style={styles.description} weight={500} label={label} />
      </View>
    </TouchableOpacity>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: uploadImageCardThemedStyle(colors),
    button: {
      borderWidth: 1,
      borderStyle: 'dashed',
    },
    description: {
      color: colors.text,
    },
    tip: {
      fontSize: 12,
      lineHeight: 14.5,
      color: colors.tipText,
    },
    maxSizeText: {
      marginTop: 4,
    },
  })
)

export default PhotoSelectBlock
