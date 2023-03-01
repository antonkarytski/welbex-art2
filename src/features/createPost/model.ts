import { createEffect } from 'effector'
import * as yup from 'yup'
import { ObjectSchema } from 'yup'
import { artsApi } from '../../api/parts/arts'
import { ImageFile } from '../../lib/files/types'
import { createFormModel } from '../../lib/models/form'
import { stringSchema } from '../../lib/yup'
import { $myProfile } from '../profile/model'
import { getAgeCategory } from './helpers'

export type ImageDescriptionFormFields = {
  childDocument: ImageFile
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
  childDocument: imageFileShape.default(null),
  image: imageFileShape.default(null),
})
export const createPostFormModel = createFormModel(schema).setSubmitSettings({
  validate: true,
  request: createEffect((data: ImageDescriptionFormFields) => {
    if (data.categoryId === null) return
    return artsApi.create({
      image: data.image,
      childDocument: data.childDocument,
      title: data.title,
      categoryId: data.categoryId,
    })
  }),
})

createPostFormModel.submit.done.watch(({ result }) => {
  console.log(result)
  if (!result) return
})
createPostFormModel.submit.fail.watch((e) => {
  console.log(JSON.stringify(e.error))
})
artsApi.create.progress.watch((e) => {
  console.log('PROGRESS')
  console.log(e)
})

$myProfile.watch((profile) => {
  if (!profile) return
  createPostFormModel.setField({
    key: createPostFormModel.fields.age,
    value: getAgeCategory(profile.age).join(' - '),
  })
})
