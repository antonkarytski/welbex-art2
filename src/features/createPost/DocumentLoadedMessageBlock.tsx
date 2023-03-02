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
import CrossIcon from '../../ui/icons/Icon.Cross'
import SuccessIcon from '../../ui/icons/Icon.Success'
import { uploadImageCardThemedStyle } from '../imagePick/styles'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'

type DocumentLoadedMessageBlockProps = {
  style?: StyleProp<ViewStyle>
  onPressRemove?: () => void
}

const DocumentLoadedMessageBlock = ({
  style,
  onPressRemove,
}: DocumentLoadedMessageBlockProps) => {
  const { styles } = useTheme(themedStyles)
  const t = useText()

  return (
    <View style={[styles.container, style]}>
      <View style={styles.innerContainer}>
        <View style={styles.iconBlock}>
          <SuccessIcon />
        </View>
        <Span style={styles.text} label={t.uploadChildDocument} />
      </View>

      <TouchableOpacity onPress={onPressRemove} style={styles.removeButton}>
        <CrossIcon />
      </TouchableOpacity>
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      ...uploadImageCardThemedStyle(colors),
      padding: 0,
      paddingHorizontal: 5,
    },
    innerContainer: {
      flexDirection: 'row',
      paddingVertical: 24,
      flex: 1,
    },
    text: {
      flex: 1,
      color: colors.text,
    },
    button: {
      borderWidth: 1,
      borderStyle: 'dashed',
    },
    iconBlock: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 17.67,
    },
    removeButton: {
      paddingHorizontal: 20,
      paddingVertical: 24,
    },
  })
)

export default DocumentLoadedMessageBlock
