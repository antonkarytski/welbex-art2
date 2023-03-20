import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { defaultColors } from '../../features/themed/theme'
import Span from '../Span'
import { TabMenuButtonStyles } from './types'

type TabMenuButtonProps = {
  onPress: (key: string, index: number) => void
  id: string
  label?: string
  Icon?: (isActive: boolean) => React.ReactElement
  isActive: boolean
  style?: TabMenuButtonStyles
  index: number
}

const TabMenuButton = React.memo(
  ({
    onPress,
    id,
    label,
    isActive,
    style,
    index,
    Icon,
  }: TabMenuButtonProps) => {
    return (
      <TouchableOpacity
        onPress={() => onPress(id, index)}
        style={styles.button}
        activeOpacity={0.6}
      >
        {label && (
          <Span
            weight={500}
            style={[
              styles.label,
              style?.label,
              isActive && [styles?.labelActive, style?.labelActive],
            ]}
            label={label}
            adjustsFontSizeToFit
            numberOfLines={1}
            minimumFontScale={0.8}
          />
        )}
        {Icon ? Icon(isActive) : null}
      </TouchableOpacity>
    )
  }
)

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  label: {
    fontSize: 18,
    color: defaultColors.textLightGrey,
  },
  labelActive: {
    color: defaultColors.text,
  },
})

export default TabMenuButton
