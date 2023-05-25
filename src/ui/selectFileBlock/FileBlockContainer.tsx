import React, { PropsWithChildren } from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { defaultColors } from '../../features/themed/theme'

export type FileBlockContainerProps = {
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  backgroundColor?: string
}

const FileBlockContainer = ({
  style,
  onPress,
  backgroundColor,
  children,
}: PropsWithChildren<FileBlockContainerProps>) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        !!backgroundColor && { backgroundColor },
        style,
      ]}
    >
      {children}
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
})

export default FileBlockContainer
