import { createEffect } from 'effector'
import * as yup from 'yup'
import { ObjectSchema } from 'yup'
import { artsApi } from '../../api/parts/arts'
import { ImageFile } from '../../lib/files/types'
import { createFormModel } from '../../lib/models/form'
import { stringSchema } from '../../lib/yup'

export type ImageDescriptionFormFields = {
  childProofImage: ImageFile | null
  imageFile: ImageFile | null
  title: string
  category: number | null
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
  category: yup.number().default(0),
  childProofImage: imageFileShape.default(null),
  imageFile: imageFileShape.default(null),
})
export const createPostFormModel = createFormModel(schema).setSubmitSettings({
  validate: true,
  request: createEffect((data: ImageDescriptionFormFields) => {
    if (!data.imageFile || data.category === null) return
    return artsApi.create({
      image: data.imageFile,
      childDocument: data.imageFile,
      title: data.title,
      categoryId: data.category,
    })
  }),
})

createPostFormModel.submit.done.watch(({ result }) => {
  if (!result) return
})
