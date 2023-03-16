import { createEvent, createStore, restore, sample } from 'effector'
import moment from 'moment'
import * as yup from 'yup'
import { ProfileEditProps } from '../../../api/parts/users/types.parts'
import { USER_DOB_FORMAT } from '../../../constants'
import { Tokens } from '../../../lib/models/apiBuilder/types.token'
import { createFormModel } from '../../../lib/models/form'
import { INITIAL_DATE } from '../../signUp/constants'
import { phoneInputModel } from '../../signUp/phone'

export const resetQuickAuthData = createEvent()
export const quickAuthFormSchema = yup.object().shape({
  birthDate: yup.date().default(INITIAL_DATE).max(new Date()).required(),
})
export const quickAuthFormModel = createFormModel(quickAuthFormSchema)
quickAuthFormModel.reset(resetQuickAuthData)

export const setQuickAuthToken = createEvent<Tokens>()
export const $quickAuthToken = restore(setQuickAuthToken, null).reset(
  resetQuickAuthData
)
export const $isOnQuickAuth = $quickAuthToken.map(Boolean)

export const addToQuickAuthCompleteData = createEvent<ProfileEditProps>()
export const $quickAuthCompleteData = createStore<ProfileEditProps | null>(null)
  .on(addToQuickAuthCompleteData, (state, payload) => {
    if (!state) return payload
    return { ...state, ...payload }
  })
  .reset(resetQuickAuthData)

export const saveFormToCompleteData =
  createEvent<Partial<Record<keyof ProfileEditProps, boolean>>>()
export const saveSignUpPhoneToCompleteData = createEvent()
sample({
  source: quickAuthFormModel.$store,
  clock: saveFormToCompleteData,
  fn: (form, filter) => {
    const list: ProfileEditProps = {}
    if (filter.DOB) {
      list.DOB = moment(form.birthDate.valueOf()).format(USER_DOB_FORMAT)
    }
    return list
  },
  target: addToQuickAuthCompleteData,
})

sample({
  source: phoneInputModel.purePhoneModel.$state,
  clock: saveSignUpPhoneToCompleteData,
  fn: (phone) => ({ phone_number: phone }),
  target: addToQuickAuthCompleteData,
})
