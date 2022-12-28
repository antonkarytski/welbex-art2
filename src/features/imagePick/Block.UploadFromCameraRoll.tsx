import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { useText } from '../../translations/hook'
import Span from '../../ui/Span'
import PlusIcon from '../../ui/icons/Icon.Plus'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import { AVAILABLE_FORMATS, MAX_UPLOAD_SIZE_MB } from './constants'
import { shadowCardThemedStyle, uploadBlockCommonStyles } from './styles'

type UploadFromCameraRollBlockProps = {
  style?: StyleProp<ViewStyle>
}
const availableFormatsString = AVAILABLE_FORMATS.join(', ')

const UploadFromCameraRollBlock = ({
  style,
}: UploadFromCameraRollBlockProps) => {
  const text = useText()
  const { styles, colors } = useTheme(themedStyles)

  return (
    <TouchableOpacity style={[styles.container, style]}>
      <View style={[uploadBlockCommonStyles.button, styles.button]}>
        <PlusIcon color={colors.text} variant={'thin'} />
      </View>
      <View style={uploadBlockCommonStyles.textBlock}>
        <Span
          style={styles.description}
          weight={500}
          label={text.selectImageFromCameraRoll}
        />
        <Span style={styles.tip} label={availableFormatsString} />
        <Span
          style={[styles.tip, styles.maxSizeText]}
          label={`${MAX_UPLOAD_SIZE_MB} mb`}
        />
      </View>
    </TouchableOpacity>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: shadowCardThemedStyle(colors),
    button: {
      backgroundColor: colors.buttonDisabled,
    },
    description: {
      marginBottom: 12,
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

export default UploadFromCameraRollBlock
