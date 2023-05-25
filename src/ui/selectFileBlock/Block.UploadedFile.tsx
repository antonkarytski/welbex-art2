import React from 'react'
import {
  Image,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { defaultColors } from '../../features/themed/theme'
import Span from '../Span'
import CrossIcon from '../icons/Icon.Cross'

export type UploadedFileBlockStyle = {
  container?: StyleProp<ViewStyle>
  text?: StyleProp<TextStyle>
  subText?: StyleProp<TextStyle>
  filePreview?: StyleProp<ViewStyle>
}

export type UploadedFileBlockProps = {
  label: string
  subLabel?: string
  onPressCrossIcon?: () => void
  isImage?: boolean
  style?: UploadedFileBlockStyle
  backgroundColor?: string
  iconColor?: string
  borderColor?: string
  imageUri?: string
}

const UploadedFileBlock = ({
  label,
  subLabel,
  style,
  onPressCrossIcon,
  backgroundColor,
  iconColor,
  imageUri,
}: UploadedFileBlockProps) => {
  return (
    <View
      style={[
        styles.container,
        !!backgroundColor && { backgroundColor },
        style?.container,
      ]}
    >
      <View style={styles.filePreviewContainer}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode={'cover'}
          />
        ) : null}
      </View>

      <View style={styles.textBlock}>
        <Span
          style={[styles.description, style?.text]}
          weight={500}
          label={label}
        />
        {!!subLabel && (
          <Span
            style={[styles.subText, style?.subText]}
            weight={500}
            label={subLabel}
          />
        )}
      </View>
      <TouchableOpacity
        style={[styles.crossIconContainer, style?.filePreview]}
        activeOpacity={0.6}
        onPress={onPressCrossIcon}
      >
        <CrossIcon color={iconColor} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: defaultColors.inputBackground,
    borderRadius: 8,
    padding: 12,
  },
  filePreviewContainer: {
    width: 76,
    height: 76,
    backgroundColor: defaultColors.screenBackground,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  description: {
    color: defaultColors.text,
  },
  subText: {
    color: defaultColors.subText,
  },
  maxSizeText: {
    marginTop: 4,
  },
  textBlock: {
    flex: 1,
    marginLeft: 20,
  },
  crossIconContainer: {
    padding: 14,
  },
})

export default UploadedFileBlock
