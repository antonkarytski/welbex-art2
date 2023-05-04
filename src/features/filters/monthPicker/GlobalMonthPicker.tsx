import { useStore } from 'effector-react'
import React, { useMemo } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import MonthPicker from 'react-native-month-year-picker'
import { START_DATE } from '../../../constants/app'
import { useLanguage, useText } from '../../../translations/hook'
import { $monthPickerTask, setMonthPickerTask } from './model.monthPicker'

enum MonthPickerAction {
  SETTLED = 'dateSetAction',
  DISMISSED = 'dismissedAction',
  NEUTRAL = 'neutralAction',
}

export function useMonthNames() {
  const t = useText()
  return useMemo(
    () => [
      t.december,
      t.january,
      t.february,
      t.march,
      t.april,
      t.may,
      t.june,
      t.july,
      t.august,
      t.september,
      t.october,
      t.november,
    ],
    [t]
  )
}

const GlobalMonthPicker = () => {
  const t = useText()
  const locale = useLanguage()
  const task = useStore($monthPickerTask)
  const months = useMonthNames()

  if (!task) return null
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setMonthPickerTask(null)
        }}
        style={[StyleSheet.absoluteFill, styles.overlay]}
      />
      <MonthPicker
        monthNames={months}
        okButton={t.done}
        cancelButton={t.cancel}
        locale={locale.toLowerCase()}
        minimumDate={START_DATE}
        maximumDate={new Date()}
        value={task.initialValue}
        onChange={(event, newDate) => {
          if (event === MonthPickerAction.SETTLED) {
            task.onSettled(newDate)
          }
          setMonthPickerTask(null)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#00000010',
  },
})

export default GlobalMonthPicker
