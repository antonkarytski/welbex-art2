import * as yup from 'yup'
import { createFormModel } from '../../../lib/models/form'
import { stringSchema } from '../../../lib/yup'
import { createPhoneEnterModel } from '../../phoneEnter/model'
import { $myProfile } from '../model'

export const profilePhoneModel = createPhoneEnterModel()
export const $profilePhoneNumber =
  profilePhoneModel.phoneInputModel.purePhoneModel.$state

const editProfileFormSchema = yup.object().shape({
  name: stringSchema().required(),
  lastName: stringSchema().required(),
  birthDate: yup.date().max(new Date()).required().default(new Date()),
})

export const editProfileFormModel = createFormModel(editProfileFormSchema)

$myProfile.watch((state) => {
  if (!state) return
})
