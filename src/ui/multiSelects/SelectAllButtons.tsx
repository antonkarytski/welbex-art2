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

const SelectAllButtons = ({
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
    paddingHorizontal: 20,
    backgroundColor: defaultColors.screenBackground,
  },
  button: {
    paddingVertical: 16,
  },
  leftButton: {
    marginRight: 40,
  },
  buttonLabel: {
    color: defaultColors.textGrey,
  },
})
export default SelectAllButtons
