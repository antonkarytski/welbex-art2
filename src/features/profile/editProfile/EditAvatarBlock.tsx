import { useStore } from 'effector-react'
import { ImagePickerAsset } from 'expo-image-picker'
import React from 'react'
import { StyleSheet } from 'react-native'
import Avatar from '../../../ui/Avatar'
import IconButton from '../../../ui/buttons/IconButton'
import PlusIcon from '../../../ui/icons/Icon.Plus'
import PhotoEditPopUp from '../../popUp/PopUp.PhotoEditActionSelect'
import DeleteAvatarPopUp from '../../popUp/profilePopUps/PopUp.DeleteAvatar'
import { createThemedStyle } from '../../themed'
import { useTheme } from '../../themed/hooks'
import { $myProfile } from '../model'
import { avatarModel, setAvatar } from './model'

const EditAvatarBlock = () => {
  const { styles, colors } = useTheme(themedStyles)
  const myProfile = useStore($myProfile)
  const newAvatar = useStore(avatarModel.$state)

  const onPickPhoto = (assets: ImagePickerAsset[]) => {
    setAvatar(assets)
  }

  const onDeletePhoto = () => {
    DeleteAvatarPopUp.showSync()
  }

  const onEditPhoto = () => {
    PhotoEditPopUp.showSync({
      props: {
        hideRemoveButton: !myProfile?.avatar && !newAvatar,
        onRemoveButtonPress: onDeletePhoto,
        onPick: onPickPhoto,
      },
    })
  }

  return (
    <Avatar
      size={112}
      style={styles.avatar}
      onPress={onEditPhoto}
      src={newAvatar || myProfile?.avatar}
    >
      <IconButton
        Icon={PlusIcon}
        onPress={onEditPhoto}
        iconColor={colors.whiteText}
        style={styles.editProfileButton}
      />
    </Avatar>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    avatar: {
      marginBottom: 32,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    editProfileButton: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      backgroundColor: colors.lightAccentDetails,
    },
  })
)

export default EditAvatarBlock
