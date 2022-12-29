import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useText } from '../../translations/hook'
import Span from '../../ui/Span'
import CameraIcon from '../../ui/icons/Icon.Camera'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import { shadowCardThemedStyle, uploadBlockCommonStyles } from './styles'

type UploadFromCameraBlockProps = {}

const UploadFromCameraBlock = ({}: UploadFromCameraBlockProps) => {
  const text = useText()
  const { styles, colors } = useTheme(themedStyles)

  return (
    <TouchableOpacity style={styles.container}>
      <View style={[uploadBlockCommonStyles.button, styles.button]}>
        <CameraIcon color={colors.text} />
      </View>
      <View style={uploadBlockCommonStyles.textBlock}>
        <Span style={styles.description} weight={500} label={text.scanWork} />
      </View>
    </TouchableOpacity>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: shadowCardThemedStyle(colors),
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
