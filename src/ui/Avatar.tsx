import React from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import EditIcon from '../ui/icons/Icon.Edit'
import PlusIcon from '../ui/icons/Icon.Plus'
import UserIcon from '../ui/icons/Icon.User'

type AvatarProps = {
  size?: number
  borderSize?: number
  src?: ImageSourcePropType
  style?: StyleProp<ViewStyle>
  onPress?: () => void
  onEditProfile?: () => void
  onAddPhoto?: () => void
  actionColors?: {
    icon?: string
    button?: string
  }
}

const DEFAULT_BORDER_SIZE = 2

const Avatar = ({
  size = 44,
  src,
  style,
  borderSize = DEFAULT_BORDER_SIZE,
  onPress,
  onEditProfile,
  onAddPhoto,
  actionColors = { icon: '#ffffff' },
}: AvatarProps) => {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.8 : 1}
      onPress={onPress || onEditProfile || onAddPhoto}
      style={[
        styles.container,
        style,
        {
          width: size,
          height: size,
          borderWidth: borderSize,
        },
      ]}
    >
      {src ? (
        <Image
          source={src}
          resizeMode={'cover'}
          borderRadius={100}
          style={{
            width: size - borderSize * 2,
            height: size - borderSize * 2,
          }}
        />
      ) : (
        <View style={[styles.defaultImage]}>
          <UserIcon size={size / 3.3} />
        </View>
      )}
      {(onEditProfile || onAddPhoto) && (
        <TouchableOpacity
          onPress={onEditProfile}
          style={[
            styles.actionIconWrapper,
            { backgroundColor: actionColors.button },
          ]}
          activeOpacity={0.8}
        >
          {onEditProfile && <EditIcon color={actionColors.icon} />}
          {onAddPhoto && (
            <PlusIcon color={actionColors.icon} variant={'regular'} />
          )}
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 100,
    borderColor: '#84BDBE',
  },
  actionIconWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 24,
    height: 24,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#84BDBE',
  },
  defaultImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: '#F2F4F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Avatar
