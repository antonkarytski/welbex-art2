import { useStore } from 'effector-react'
import { ImagePickerAsset } from 'expo-image-picker'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { $isAuth } from '../../features/auth/model'
import {
  FREE_UPLOADS_LIMIT,
  PAID_UPLOADS_LIMIT,
} from '../../features/createPost/constants'
import PhotoSelectBlock, {
  CAMERA_SOURCE_PRESET,
} from '../../features/imagePick/Block.PhotoSelect'
import UploadFromCameraRollBlock from '../../features/imagePick/Block.UploadFromCameraRoll'
import { runCropper } from '../../features/imagePick/imageCropper/model'
import PopUpAgeError from '../../features/popUp/PopUp.AgeError'
import {
  PopUpArtWorksLimitExceedFree,
  PopUpArtWorksLimitExceedPaid,
} from '../../features/popUp/PopUp.ArtWorksLimitExceed'
import PopUpLogin from '../../features/popUp/profilePopUps/PopUp.Login'
import { $myProfile } from '../../features/profile/model'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { userAge } from '../../features/user/helpers'
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

  const isAuth = useStore($isAuth)
  const myProfile = useStore($myProfile)

  useEffect(() => {
    const getPopUp = () => {
      if (!isAuth) return PopUpLogin
      if (!myProfile?.is_child || userAge(myProfile) < 2) return PopUpAgeError
      if (
        !myProfile.subscription &&
        (myProfile.works_uploaded_in_this_month || 0) > FREE_UPLOADS_LIMIT
      ) {
        return PopUpArtWorksLimitExceedFree
      }
      if ((myProfile.works_uploaded_in_this_month || 0) > PAID_UPLOADS_LIMIT) {
        return PopUpArtWorksLimitExceedPaid
      }
    }
    const onFocus = () => {
      const popUp = getPopUp()
      if (popUp) {
        popUp.showSync()
        navigation.goBack()
      }
    }
    navigation.addListener('focus', onFocus)
    return () => {
      navigation.removeListener('focus', onFocus)
    }
  }, [navigation, myProfile, isAuth])

  const onImagePick = (assets: ImagePickerAsset[]) => {
    navigate(links.createPostAddDescription, { assets, category })
  }

  const onPickFromCamera = async (assets: ImagePickerAsset[]) => {
    const cropResult = await runCropper(assets)
    if (!cropResult) return
    navigate(links.createPostAddDescription, { assets: cropResult, category })
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
          onPick={onPickFromCamera}
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
