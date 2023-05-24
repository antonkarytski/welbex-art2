import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { NodeFn } from 'altek-toolkit'
import Span from '../Span'
import { IconProps } from '../icons/_types'

type IconButtonProps = {
  Icon?: NodeFn<IconProps>
  onPress?: () => void
  iconSize?: number
  style?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  iconColor?: string
  label?: string
  withBadge?: boolean
  badgeColor?: string
}

type BadgeProps = {
  color?: string
  style?: StyleProp<ViewStyle>
}
const Badge = ({ color = '#333333', style }: BadgeProps) => {
  return (
    <View style={[badgeStyles.container, style, { backgroundColor: color }]} />
  )
}

const badgeStyles = StyleSheet.create({
  container: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
})
const IconButton = ({
  onPress,
  Icon,
  iconSize,
  iconColor,
  style,
  label,
  labelStyle,
  withBadge,
  badgeColor,
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, !label && styles.sizedContainer, style]}
      activeOpacity={0.8}
    >
      {withBadge && <Badge style={styles.badge} color={badgeColor} />}
      {Icon?.({ color: iconColor, size: iconSize })}
      {label && (
        <Span label={label} weight={500} style={[styles.label, labelStyle]} />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  sizedContainer: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 14,
    lineHeight: 19,
    marginTop: 6,
  },
  badge: {
    position: 'absolute',
    zIndex: 2,
    top: -2.5,
    right: -2.5,
  },
})

export default IconButton
