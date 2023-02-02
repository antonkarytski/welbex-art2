import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from 'react-native'
import Span from '../../../ui/Span'

type TabMenuButtonProps = {
  onPress: (key: string) => void
  id: string
  textStyle?: StyleProp<TextStyle>
  textActiveStyle?: StyleProp<TextStyle>
  label: string
  isActive: boolean
}

const TabMenuButton = React.memo(
  ({
    onPress,
    id,
    textStyle,
    label,
    textActiveStyle,
    isActive,
  }: TabMenuButtonProps) => {
    return (
      <TouchableOpacity
        onPress={() => onPress(id)}
        style={styles.button}
        activeOpacity={0.6}
      >
        <Span
          weight={500}
          style={[styles.text, textStyle, isActive && textActiveStyle]}
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
  text: {
    fontSize: 18,
  },
})

export default TabMenuButton
