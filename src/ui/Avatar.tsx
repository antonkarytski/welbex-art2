import React from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

type AvatarProps = {
  size?: number
  borderSize?: number
  src: ImageSourcePropType
  style?: StyleProp<ViewStyle>
}

const DEFAULT_BORDER_SIZE = 2

const Avatar = ({
  size = 44,
  src,
  style,
  borderSize = DEFAULT_BORDER_SIZE,
}: AvatarProps) => {
  return (
    <View
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
  },
})

export default Avatar
