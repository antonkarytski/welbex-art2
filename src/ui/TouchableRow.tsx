import React, { ReactNode } from 'react'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { NodeFn } from 'altek-toolkit'
import { defaultColors } from '../features/themed/theme'
import Row from './Row'
import Span from './Span'
import { IconProps } from './icons/_types'

type TouchableRowProps = {
  onPress: () => void
  Icon?: NodeFn<IconProps>
  label?: string
  children?: ReactNode
  style?: {
    icon?: StyleProp<ViewStyle>
    label?: StyleProp<TextStyle>
    row?: StyleProp<ViewStyle>
    container?: StyleProp<ViewStyle>
  }
  iconColor?: string
  iconSize?: number
}

const TouchableRow = ({
  onPress,
  Icon,
  label,
  children,
  style,
  iconColor,
  iconSize,
}: TouchableRowProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={[styles.container, style?.container]}
    >
      <Row style={[styles.row, style?.row]}>
        {children || (
          <>
            {Icon?.({
              color: iconColor,
              size: iconSize,
              style: [styles.icon, style?.icon],
            })}
            {label && (
              <Span
                label={label}
                weight={500}
                style={[styles.label, style?.label]}
              />
            )}
          </>
        )}
      </Row>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  icon: { marginRight: 17 },
  label: {
    fontSize: 16,
    lineHeight: 19,
    color: defaultColors.text,
  },
  row: {
    justifyContent: 'flex-start',
    paddingVertical: 18,
  },
})

export default TouchableRow
