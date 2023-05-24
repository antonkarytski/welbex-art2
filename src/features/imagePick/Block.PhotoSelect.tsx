import { ImagePickerAsset } from 'expo-image-picker'
import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { noop } from '../../lib/helpers'
import DashedCameraBlock from '../../ui/DashedCameraBlock'
import Span from '../../ui/Span'
import { singlePhotoTask, useCameraNavigate } from '../camera/hooks'
import PopUpPhotoEditActionSelect from '../popUp/PopUp.PhotoEditActionSelect'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import { pickFromCameraRoll } from './pickFiles'
import { uploadBlockCommonStyles, uploadImageCardThemedStyle } from './styles'

export enum PhotoSelectSources {
  CAMERA = 1,
  GALLERY = 2,
}

export const CAMERA_SOURCE_PRESET = [PhotoSelectSources.CAMERA]
export const GALLERY_SOURCE_PRESET = [PhotoSelectSources.GALLERY]

type UploadFromCameraBlockProps = {
  label: string
  subLabel?: string
  style?: StyleProp<ViewStyle>
  onPick?: (assets: ImagePickerAsset[]) => void
  sources?: PhotoSelectSources[]
  backgroundColor?: string
  selectionLimit?: number
}

const PhotoSelectBlock = ({
  label,
  subLabel,
  style,
  onPick,
  sources = [PhotoSelectSources.CAMERA, PhotoSelectSources.GALLERY],
  backgroundColor,
  selectionLimit,
}: UploadFromCameraBlockProps) => {
  const goToCamera = useCameraNavigate(singlePhotoTask({ onPick }))
  const { styles, colors } = useTheme(themedStyles)

  return (
    <TouchableOpacity
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
      style={[
        styles.container,
        !!backgroundColor && { backgroundColor },
        style,
      ]}
    >
      <DashedCameraBlock
        backgroundColor={backgroundColor || styles.container.backgroundColor}
        borderColor={colors.textLightGrey}
        iconColor={colors.text}
      />
      <View style={uploadBlockCommonStyles.textBlock}>
        <Span style={styles.description} weight={500} label={label} />
        {!!subLabel && (
          <Span style={styles.subText} weight={500} label={subLabel} />
        )}
      </View>
    </TouchableOpacity>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: uploadImageCardThemedStyle(colors),
    description: {
      color: colors.text,
    },
    subText: {
      color: colors.subText,
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
