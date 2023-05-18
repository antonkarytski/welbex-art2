import { combine, sample } from 'effector'
import moment from 'moment'
import { createStateModel } from 'altek-toolkit'
import { $availableCategories } from '../../profile/model.availableCategories'
import { createPostFormModel } from '../model'
import { selectedCategoryModel } from '../model.categorySelect'

const INITIAL_MONTH_OF_PARTICIPATION_ITEMS = [
  moment().valueOf(),
  moment().add(1, 'month').startOf('month').valueOf(),
]
export const monthOfParticipationItems = createStateModel<number[]>(
  INITIAL_MONTH_OF_PARTICIPATION_ITEMS
)

export const monthOfParticipationModel = createStateModel<number | null>(
  Date.now()
)

monthOfParticipationModel.$state.watch((value) => {
  if (!value) return
  const isNextMonth = moment(value).month() === moment().month() + 1
  createPostFormModel.setField({
    value: isNextMonth,
    key: createPostFormModel.fields.nextMonth,
  })
})

combine({
  available: $availableCategories,
  selected: selectedCategoryModel.$state,
}).watch(({ available, selected }) => {
  if (!available || !selected) return
  const mask = [
    available.current_month.includes(selected.id),
    available.next_month.includes(selected.id),
  ]
  monthOfParticipationItems.set(
    INITIAL_MONTH_OF_PARTICIPATION_ITEMS.filter((_, index) => mask[index])
  )
})

sample({
  source: monthOfParticipationModel.$state,
  clock: monthOfParticipationItems.$state.updates,
  fn: (selected, items) => ({ selected, items }),
}).watch(({ selected, items }) => {
  if (!selected && items.length) {
    return monthOfParticipationModel.set(items[0])
  }
  if (selected && !items.length) {
    return monthOfParticipationModel.set(null)
  }
  if (selected && items.length && !items.includes(selected)) {
    return monthOfParticipationModel.set(items[0])
  }
})

sample({
  source: monthOfParticipationModel.$state,
  clock: $availableCategories.updates,
  fn: (month, categories) => {
    if (!categories || !month) return
    return { month, categories }
  },
}).watch((props) => {
  if (!props) return
  const { month, categories } = props
  const isNextMonth = moment(month).month() === moment().month() + 1
  if (!categories.current_month.length && !isNextMonth) {
    const nextMonth = moment().add(1, 'month').startOf('month').valueOf()
    monthOfParticipationModel.set(nextMonth)
    return
  }
  if (isNextMonth && !categories.next_month.length) {
    monthOfParticipationModel.set(Date.now())
  }
})
