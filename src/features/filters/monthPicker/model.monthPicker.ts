import { createEvent, restore } from 'effector'

export type MonthPickerTask = {
  initialValue: Date
  onSettled: (value: Date) => void
}
export const setMonthPickerTask = createEvent<MonthPickerTask | null>()
export const $monthPickerTask = restore(setMonthPickerTask, null)
