import { createEffect } from 'effector'
import * as yup from 'yup'
import { ObjectSchema } from 'yup'
import { api } from '../../api'
import { ImageFile } from '../../lib/files/types'
import { createFormModel } from '../../lib/models/form'
import { stringSchema } from '../../lib/yup'
import { updateProfile } from '../profile/model'
import { createPostAds } from './model.ads'

export type ImageDescriptionFormFields = {
  image: ImageFile
  title: string
  categoryId: number | null
  age: string
}

const imageFileShape = yup.object().shape({
  uri: yup.string().required(),
  name: yup.string().required(),
  size: yup.number().required(),
})

const schema: ObjectSchema<ImageDescriptionFormFields> = yup.object().shape({
  age: stringSchema(),
  title: stringSchema(),
  categoryId: yup.number().default(0),
  image: imageFileShape.default(null),
})

export const createPostFormModel = createFormModel(schema).setSubmitSettings({
  validate: true,
  request: createEffect(async (data: ImageDescriptionFormFields) => {
    if (data.categoryId === null) return
    //await createPostAds.run()
    return api.arts.create({
      image: data.image,
      title: data.title,
      categoryId: data.categoryId,
    })
  }),
})

createPostFormModel.submit.done.watch(({ result }) => {
  if (!result) return
  updateProfile((profile) => ({
    works_uploaded_in_this_month:
      (profile.works_uploaded_in_this_month || 0) + 1,
  }))
})
