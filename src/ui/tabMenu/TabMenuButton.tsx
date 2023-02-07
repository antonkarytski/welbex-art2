import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { defaultColors } from '../../features/themed/theme'
import Span from '../Span'
import { TabMenuButtonStyles } from './types'

type TabMenuButtonProps = {
  onPress: (key: string) => void
  id: string
  label?: string
  isActive: boolean
  style?: TabMenuButtonStyles
}

const TabMenuButton = React.memo(
  ({ onPress, id, label, isActive, style }: TabMenuButtonProps) => {
    return (
      <TouchableOpacity
        onPress={() => onPress(id)}
        style={styles.button}
        activeOpacity={0.6}
      >
        <Span
          weight={500}
          style={[styles.label, style?.label, isActive && style?.labelActive]}
          label={label}
        />
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
