import React from 'react'
import {
  Animated,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { useText } from '../../../translations/hook'
import Span from '../../../ui/Span'
import CrossIcon from '../../../ui/icons/Icon.Cross'
import LoaderIcon from '../../../ui/icons/Icon.Loader'
import ProgressBar from '../../../ui/progress/ProgressBar'
import { createThemedStyle } from '../../themed'
import { useTheme } from '../../themed/hooks'
import { ChildDocumentStatusDescriptor } from './helpers'

type DocumentLoadedMessageBlockProps = {
  style?: StyleProp<ViewStyle>
  onPressRemove?: () => void
  isOnLoading?: boolean
  progressValue?: Animated.Value
  descriptor: ChildDocumentStatusDescriptor
}

const DocumentStatusMessageBlock = ({
  style,
  onPressRemove,
  isOnLoading,
  progressValue,
  descriptor,
}: DocumentLoadedMessageBlockProps) => {
  const { styles, colors } = useTheme(themedStyles)
  const t = useText()

  return (
    <View style={[styles.container, style]}>
      <View style={styles.contentBlock}>
        <View style={styles.contentInnerContainer}>
          <View style={styles.iconContainer}>
            {isOnLoading ? (
              <LoaderIcon color={colors.icon} size={24} />
            ) : (
              <descriptor.Icon color={descriptor.color?.(colors)} size={20} />
            )}
          </View>
          <Span
            weight={500}
            style={styles.text}
            label={
              isOnLoading
                ? t.childIdentityStatusMessage.uploading
                : descriptor.label?.(t)
            }
          />
        </View>
        {!descriptor.revokeDisabled && (
          <TouchableOpacity onPress={onPressRemove} style={styles.removeButton}>
            <CrossIcon />
          </TouchableOpacity>
        )}
      </View>
      {isOnLoading && !!progressValue && (
        <View style={styles.progressBlock}>
          <ProgressBar
            value={progressValue}
            color={colors.darkLine}
            barColor={colors.text}
          />
        </View>
      )}
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.screenBackground,
      borderRadius: 20,
      minHeight: 104,
    },
    contentBlock: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
    },
    contentInnerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      minHeight: 64,
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 52,
    },
    removeButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 56,
      height: 56,
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
