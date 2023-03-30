import { useStore } from 'effector-react'
import { ImagePickerAsset } from 'expo-image-picker'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import PhotoSelectBlock, {
  CAMERA_SOURCE_PRESET,
} from '../../features/imagePick/Block.PhotoSelect'
import UploadFromCameraRollBlock from '../../features/imagePick/Block.UploadFromCameraRoll'
import PopUpAgeError from '../../features/popUp/PopUp.AgeError'
import { $myProfile } from '../../features/profile/model'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { useNavigate } from '../../navigation'
import GradientScreenHeader from '../../navigation/elements/GradientScreenHeader'
import { links } from '../../navigation/links'
import { ScreenComponentProps } from '../../navigation/types.screenProps'
import { themedPrimaryGradient } from '../../styles/gradients'
import { themedShadow5Style } from '../../styles/shadows'
import { useText } from '../../translations/hook'

export default function UploadPostImageScreen({
  route,
  navigation,
}: ScreenComponentProps<links.createPostUploadImage>) {
  const category = route.params?.category
  const text = useText()
  const navigate = useNavigate()
  const { styles } = useThemedStyleList({
    common: themedStyle,
    gradient: themedPrimaryGradient,
  })

  const myProfile = useStore($myProfile)

  useEffect(() => {
    navigation.addListener('focus', () => {
      if (!myProfile?.is_child) {
        PopUpAgeError.showSync()
        navigation.goBack()
      }
    })
  }, [navigation, myProfile])

  const onImagePick = (assets: ImagePickerAsset[]) => {
    navigate(links.createPostAddDescription, { assets, category })
  }

  return (
    <View>
      <GradientScreenHeader
        title={text.uploadImage}
        gradient={{ colors: styles.gradient }}
      />
      <View style={styles.common.contentContainer}>
        <UploadFromCameraRollBlock
          style={styles.common.cameraRollBlock}
          onPick={onImagePick}
        />
        <PhotoSelectBlock
          style={styles.common.uploadFromCameraBlock}
          label={text.scanWork}
          onPick={onImagePick}
          sources={CAMERA_SOURCE_PRESET}
        />
      </View>
    </View>
  )
}

const themedStyle = createThemedStyle((colors) =>
  StyleSheet.create({
    uploadFromCameraBlock: themedShadow5Style(colors),
    contentContainer: {
      paddingHorizontal: 20,
      marginTop: 32,
    },
    cameraRollBlock: {
      marginBottom: 20,
    },
  })
)
