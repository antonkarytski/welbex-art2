import { View } from 'native-base'
import React from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import EditIcon from '../ui/icons/Icon.Edit'

type AvatarProps = {
  size?: number
  borderSize?: number
  src: ImageSourcePropType
  style?: StyleProp<ViewStyle>
  onPress?: () => void
  showEditIcon?: boolean
  editIconColor?: string
}

const DEFAULT_BORDER_SIZE = 2

const Avatar = ({
  size = 44,
  src,
  style,
  borderSize = DEFAULT_BORDER_SIZE,
  onPress,
  showEditIcon,
  editIconColor = '#ffffff',
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
      {showEditIcon && (
        <View style={styles.editIconWrapper}>
          <EditIcon color={editIconColor} />
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 100,
  },
  editIconWrapper: {
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
})

export default Avatar
