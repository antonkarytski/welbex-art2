import { ImagePickerAsset } from 'expo-image-picker'
import React from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { noop } from '../../lib/helpers'
import FileSelectBlock, {
  FileSelectBlockProps,
} from '../../ui/selectFileBlock/Block.FileSelect'
import { singlePhotoTask, useCameraNavigate } from '../camera/hooks'
import PopUpPhotoEditActionSelect from '../popUp/PopUp.PhotoEditActionSelect'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import { pickFromCameraRoll } from './pickFiles'
import { uploadImageCardThemedStyle } from './styles'

export enum PhotoSelectSources {
  CAMERA = 1,
  GALLERY = 2,
}

export const CAMERA_SOURCE_PRESET = [PhotoSelectSources.CAMERA]
export const GALLERY_SOURCE_PRESET = [PhotoSelectSources.GALLERY]

type UploadFromCameraBlockProps = {
  style?: StyleProp<ViewStyle>
  onPick?: (assets: ImagePickerAsset[]) => void
  sources?: PhotoSelectSources[]
  selectionLimit?: number
} & Omit<FileSelectBlockProps, 'onPress' | 'style'>

const PhotoSelectBlock = ({
  style,
  onPick,
  sources = [PhotoSelectSources.CAMERA, PhotoSelectSources.GALLERY],
  selectionLimit,
  ...props
}: UploadFromCameraBlockProps) => {
  const goToCamera = useCameraNavigate(singlePhotoTask({ onPick }))
  const { styles, colors } = useTheme(themedStyles)

  return (
    <FileSelectBlock
      isImage
      onPress={() => {
        if (sources.length === 0) return
        if (sources.length > 1) {
          return PopUpPhotoEditActionSelect.showSync({
            props: { hideRemoveButton: true, onPick },
          })
        }
        const source = sources[0]
        if (source === PhotoSelectSources.CAMERA) {
          return goToCamera()
        }
        if (source === PhotoSelectSources.GALLERY) {
          pickFromCameraRoll({ selectionLimit })
            .then((assets) => {
              if (assets) onPick?.(assets)
            })
            .catch(noop)
        }
      }}
      borderColor={colors.textLightGrey}
      iconColor={colors.text}
      style={{ ...styles, container: [styles.container, style] }}
      {...props}
    />
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: uploadImageCardThemedStyle(colors),
    text: {
      color: colors.text,
    },
    subText: {
      color: colors.subText,
    },
  })
)

export default PhotoSelectBlock
