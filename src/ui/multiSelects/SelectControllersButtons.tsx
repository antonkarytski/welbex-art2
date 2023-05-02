import React from 'react'
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { defaultColors } from '../../features/themed/theme'
import Row from '../Row'
import TextButton from '../buttons/Button.Text'

export type SelectAllButtonsStyles = {
  row?: StyleProp<ViewStyle>
  buttonLabel?: StyleProp<TextStyle>
  button?: StyleProp<ViewStyle>
}

type SelectAllButtonsProps = {
  selectAllLabel: string
  removeAllLabel: string
  onSelectAll: () => void
  onRemoveAll: () => void
  style?: SelectAllButtonsStyles
}

const SelectControllersButtons = ({
  selectAllLabel = 'Select all',
  removeAllLabel = 'Remove all',
  onSelectAll,
  onRemoveAll,
  style,
}: SelectAllButtonsProps) => {
  return (
    <Row style={[styles.row, style?.row]}>
      <TextButton
        label={selectAllLabel}
        onPress={onSelectAll}
        style={{
          button: [styles.button, styles.leftButton, style?.button],
          label: [styles.buttonLabel, style?.buttonLabel],
        }}
      />
      <TextButton
        label={removeAllLabel}
        onPress={onRemoveAll}
        style={{
          button: [styles.button, style?.button],
          label: [styles.buttonLabel, style?.buttonLabel],
        }}
      />
    </Row>
  )
}
const styles = StyleSheet.create({
  row: {
    backgroundColor: defaultColors.screenBackground,
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 14.5,
    paddingHorizontal: 20,
  },
  leftButton: {
    marginRight: 40,
  },
  buttonLabel: {
    color: defaultColors.textGrey,
  },
})
export default SelectControllersButtons
