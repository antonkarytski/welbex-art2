import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { defaultColors } from '../../features/themed/theme'
import Span from '../Span'
import DashedCameraBlock from '../dashedCornerBlock/DashedCameraBlock'
import DashedCornerBlock, {
  DashedCornerBlockProps,
} from '../dashedCornerBlock/DashedCornerBlock'
import UploadIcon from '../icons/Icon.IncomingArrow'

export type FileSelectBlockStyle = {
  container?: StyleProp<ViewStyle>
  text?: StyleProp<TextStyle>
  subText?: StyleProp<TextStyle>
  dashedBlock?: StyleProp<ViewStyle>
}

export type FileSelectBlockProps = {
  label: string
  subLabel?: string
  onPress?: () => void
  isImage?: boolean
  style?: FileSelectBlockStyle
  backgroundColor?: string
  iconColor?: string
  borderColor?: string
  dashedBlockSizes?: Pick<DashedCornerBlockProps, 'size' | 'crossSize'>
}

const FileSelectBlock = ({
  label,
  subLabel,
  style,
  onPress,
  backgroundColor,
  isImage,
  iconColor,
  borderColor,
  dashedBlockSizes,
}: FileSelectBlockProps) => {
  const dashedBlockProps = {
    iconColor,
    borderColor,
    backgroundColor: backgroundColor || styles.container.backgroundColor,
    style: style?.dashedBlock,
    ...dashedBlockSizes,
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        !!backgroundColor && { backgroundColor },
        style?.container,
      ]}
    >
      {isImage ? (
        <DashedCameraBlock {...dashedBlockProps} />
      ) : (
        <DashedCornerBlock {...dashedBlockProps}>
          <UploadIcon />
        </DashedCornerBlock>
      )}
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
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: defaultColors.screenBackground,
    borderRadius: 20,
    padding: 12,
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
})

export default FileSelectBlock
