import { createFormModel } from '../../lib/componentsModels/model.form'

export type ImageDescriptionFormFields = {
  childProofImage: string
  title: string
  category: string
  age: string
  imageUri: string
}

const initialImageDescriptionFormFields: ImageDescriptionFormFields = {
  age: '',
  imageUri: '',
  title: '',
  childProofImage: '',
  category: '',
}

export const createPostFormModel = createFormModel(
  initialImageDescriptionFormFields
)
