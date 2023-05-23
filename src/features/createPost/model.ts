import { createEffect } from 'effector'
import * as yup from 'yup'
import { ObjectSchema } from 'yup'
import { api } from '../../api'
import { ImageFile } from '../../lib/files/types'
import { noop } from '../../lib/helpers'
import { createFormModel } from '../../lib/models/form'
import { stringSchema } from '../../lib/yup'
import { loadAvailableCategories } from '../profile/model.availableCategories'

export type ImageDescriptionFormFields = {
  image: ImageFile
  title: string
  categoryId: number | null
  age: string
  nextMonth: boolean
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
  nextMonth: yup.boolean().default(false),
})

const submitRequest = createEffect(async (data: ImageDescriptionFormFields) => {
  if (data.categoryId === null) return
  //await createPostAds.run()
  return api.arts.create({
    image: data.image,
    title: data.title,
    category_id: data.categoryId,
    next_month_competition: data.nextMonth,
  })
})
export const createPostFormModel = createFormModel(schema).setSettings({
  validate: true,
  request: submitRequest,
})

submitRequest.done.watch(({ params }) => {
  if (params.categoryId === null) return
  loadAvailableCategories().catch(noop)
  // removeCategoryFromAvailable({
  //   id: params.categoryId,
  //   nextMonth: params.nextMonth,
  // })
})
