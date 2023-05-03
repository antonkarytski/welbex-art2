import React from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import DateDelimiter from '../../../ui/DateDelimiter'
import Span from '../../../ui/Span'
import ButtonInputLike from '../../../ui/buttons/Button.InputLike'
import { inputStyles } from '../../../ui/input/styles'
import { InputStyles } from '../../../ui/input/types'

export type MonthPickerStyles = {
  container?: ViewStyle
  title?: ViewStyle
}

type MonthPickerFieldProps = {
  title?: string
  style?: MonthPickerStyles
  inputStyle?: InputStyles
}

const MonthPickerFilter = ({
  inputStyle,
  style,
  title = 'Date',
}: MonthPickerFieldProps) => {
  return (
    <View style={[styles.container, style?.container]}>
      <Span weight={500} style={[styles.title, style?.title]} label={title} />
      <View style={styles.inputsContainer}>
        <ButtonInputLike style={inputStyle} onPress={() => {}} />
        <DateDelimiter />
        <ButtonInputLike style={inputStyle} onPress={() => {}} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  inputsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: 8,
  },
})

export default MonthPickerFilter
