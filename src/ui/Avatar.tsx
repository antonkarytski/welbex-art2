import React from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

type AvatarProps = {
  size?: number
  borderSize?: number
  src: ImageSourcePropType
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
}: AvatarProps) => {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.8 : 1}
      onPress={onPress}
      style={[
        styles.container,
        style,
        { width: size, height: size, borderWidth: borderSize },
      ]}
    >
      <Image
        source={src}
        resizeMode={'cover'}
        borderRadius={100}
        style={{
          width: size - borderSize * 2,
          height: size - borderSize * 2,
        }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
  },
})

export default Avatar
