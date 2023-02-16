import React, { PropsWithChildren } from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import UserIcon from '../ui/icons/Icon.User'

type AvatarProps = {
  size?: number
  borderSize?: number
  src?: ImageSourcePropType | string
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

const DEFAULT_BORDER_SIZE = 2

const Avatar = ({
  size = 44,
  src,
  style,
  borderSize = DEFAULT_BORDER_SIZE,
  onPress,
  children,
}: PropsWithChildren<AvatarProps>) => {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.8 : 1}
      onPress={onPress}
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
          source={typeof src === 'string' ? { uri: src } : src}
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
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 100,
    borderColor: '#84BDBE',
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
