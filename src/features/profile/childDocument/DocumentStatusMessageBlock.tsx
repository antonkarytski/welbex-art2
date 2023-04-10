import React from 'react'
import {
  Animated,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { IdentityDocumentStatus } from '../../../api/parts/users/types.api'
import { useText } from '../../../translations/hook'
import Span from '../../../ui/Span'
import CrossIcon from '../../../ui/icons/Icon.Cross'
import LoaderIcon from '../../../ui/icons/Icon.Loader'
import ProgressBar from '../../../ui/progress/ProgressBar'
import { createThemedStyle } from '../../themed'
import { useTheme } from '../../themed/hooks'
import { getChildDocumentStatusDescriptor } from './helpers'
import { useChildDocumentStatus } from './hooks'

type DocumentLoadedMessageBlockProps = {
  style?: StyleProp<ViewStyle>
  onPressRemove?: () => void
  isOnLoading?: boolean
  progressValue?: Animated.Value
  status: IdentityDocumentStatus
}

const DocumentStatusMessageBlock = ({
  style,
  onPressRemove,
  isOnLoading,
  progressValue,
  status,
}: DocumentLoadedMessageBlockProps) => {
  const { styles, colors } = useTheme(themedStyles)
  const statusDescriptor = getChildDocumentStatusDescriptor(status)
  const t = useText()

  return (
    <View style={[styles.container, style]}>
      <View style={styles.contentBlock}>
        <View style={styles.contentInnerContainer}>
          <View style={styles.iconContainer}>
            {isOnLoading ? (
              <LoaderIcon color={colors.icon} size={24} />
            ) : (
              <statusDescriptor.Icon
                color={statusDescriptor.color?.(colors)}
                size={20}
              />
            )}
          </View>
          <Span
            style={styles.text}
            label={
              isOnLoading ? t.documentUploading : statusDescriptor.label(t)
            }
          />
        </View>

        <TouchableOpacity onPress={onPressRemove} style={styles.removeButton}>
          <CrossIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.progressBlock}>
        {isOnLoading && !!progressValue && (
          <ProgressBar
            value={progressValue}
            color={colors.darkLine}
            barColor={colors.text}
          />
        )}
      </View>
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.screenBackground,
      borderRadius: 20,
    },
    contentBlock: {
      flexDirection: 'row',
      flex: 1,
    },
    contentInnerContainer: {
      flexDirection: 'row',
      paddingTop: 24,
      flex: 1,
      minHeight: 64,
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: 56,
    },
    removeButton: {
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      width: 80,
      paddingTop: 29,
      paddingRight: 25,
    },
    text: {
      flex: 1,
      color: colors.text,
    },
    progressBlock: {
      paddingBottom: 24,
      height: 28,
      paddingHorizontal: 20,
    },
  })
)

export default DocumentStatusMessageBlock
