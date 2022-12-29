import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import Span from '../../ui/Span'
import CameraIcon from '../../ui/icons/Icon.Camera'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import { uploadBlockCommonStyles, uploadImageCardThemedStyle } from './styles'

type UploadFromCameraBlockProps = {
  label: string
  style?: StyleProp<ViewStyle>
}

const UploadFromCameraBlock = ({
  label,
  style,
}: UploadFromCameraBlockProps) => {
  const { styles, colors } = useTheme(themedStyles)

  return (
    <TouchableOpacity style={[styles.container, style]}>
      <View style={[uploadBlockCommonStyles.button, styles.button]}>
        <CameraIcon color={colors.text} />
      </View>
      <View style={uploadBlockCommonStyles.textBlock}>
        <Span style={styles.description} weight={500} label={label} />
      </View>
    </TouchableOpacity>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: uploadImageCardThemedStyle(colors),
    button: {
      borderWidth: 1,
      borderStyle: 'dashed',
    },
    description: {
      color: colors.text,
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

export default UploadFromCameraBlock
