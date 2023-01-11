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
  label: string
}

const TabMenuButton = React.memo(
  ({ onPress, id, textStyle, label }: TabMenuButtonProps) => {
    return (
      <TouchableOpacity onPress={() => onPress(id)} style={styles.button}>
        <Span weight={500} style={[styles.text, textStyle]} label={label} />
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
