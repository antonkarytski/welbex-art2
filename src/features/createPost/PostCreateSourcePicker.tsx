import { ImagePickerAsset } from 'expo-image-picker'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SpecificCategoryResponse } from '../../api/parts/categories/types'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { themedShadow5Style } from '../../styles/shadows'
import { useText } from '../../translations/hook'
import PhotoSelectBlock, {
  CAMERA_SOURCE_PRESET,
} from '../imagePick/Block.PhotoSelect'
import UploadFromCameraRollBlock from '../imagePick/Block.UploadFromCameraRoll'
import { runCropper } from '../imagePick/imageCropper/model'
import { createThemedStyle } from '../themed'
import { useThemedStyle } from '../themed/hooks'

type PostCreateSourcePickerProps = {
  initialCategory?: SpecificCategoryResponse
}

const PostCreateSourcePicker = ({
  initialCategory: category,
}: PostCreateSourcePickerProps) => {
  const t = useText()
  const navigate = useNavigate()
  const styles = useThemedStyle(themedStyles)

  const onImagePick = (assets: ImagePickerAsset[]) => {
    navigate(links.createPostAddDescription, { assets, category })
  }

  const onPickFromCamera = async (assets: ImagePickerAsset[]) => {
    const cropResult = await runCropper(assets)
    if (!cropResult) return
    navigate(links.createPostAddDescription, { assets: cropResult, category })
  }

  return (
    <>
      <UploadFromCameraRollBlock
        style={styles.cameraRollBlock}
        onPick={onImagePick}
      />
      <PhotoSelectBlock
        style={styles.uploadFromCameraBlock}
        label={t.scanWork}
        onPick={onPickFromCamera}
        sources={CAMERA_SOURCE_PRESET}
      />
    </>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    uploadFromCameraBlock: themedShadow5Style(colors),
    cameraRollBlock: {
      marginBottom: 20,
    },
  })
)

export default PostCreateSourcePicker
