import { useStore } from 'effector-react'
import React from 'react'
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

const GlobalMonthPicker = () => {
  const t = useText()
  const locale = useLanguage()
  const task = useStore($monthPickerTask)

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
        okButton={t.done}
        cancelButton={t.cancel}
        locale={locale.toLocaleLowerCase()}
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
