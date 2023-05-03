import moment from 'moment'
import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { StateModel, useStateStore } from 'altek-toolkit'
import { START_DATE } from '../../../constants/app'
import DateDelimiter from '../../../ui/DateDelimiter'
import Span from '../../../ui/Span'
import ButtonInputLike from '../../../ui/buttons/Button.InputLike'
import { InputStyles } from '../../../ui/input/types'
import { setMonthPickerTask } from './model.monthPicker'

export type MonthPickerStyles = {
  container?: ViewStyle
  title?: ViewStyle
}

type MonthPickerFieldProps = {
  title?: string
  style?: MonthPickerStyles
  inputStyle?: InputStyles
  minValueModel: StateModel<Date | null>
  maxValueModel: StateModel<Date | null>
}

const MonthPickerFilter = ({
  inputStyle,
  style,
  title = 'Date',
  maxValueModel,
  minValueModel,
}: MonthPickerFieldProps) => {
  const [minValue, setMinValue] = useStateStore(minValueModel)
  const [maxValue, setMaxValue] = useStateStore(maxValueModel)

  return (
    <View style={[styles.container, style?.container]}>
      <Span weight={500} style={[styles.title, style?.title]} label={title} />
      <View style={styles.inputsContainer}>
        <ButtonInputLike
          label={minValue ? moment(minValue).format('MMMM YYYY') : ''}
          style={inputStyle}
          onPress={() => {
            setMonthPickerTask({
              initialValue: minValue ? new Date(minValue) : START_DATE,
              onSettled: (date) => setMinValue(date),
            })
          }}
        />
        <DateDelimiter />
        <ButtonInputLike
          label={maxValue ? moment(maxValue).format('MMMM YYYY') : ''}
          style={inputStyle}
          onPress={() => {
            setMonthPickerTask({
              initialValue: maxValue ? new Date(maxValue) : new Date(),
              onSettled: (date) => setMaxValue(date),
            })
          }}
        />
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
