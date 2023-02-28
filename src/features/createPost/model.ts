import { ImageFile } from '../../lib/files/types'
import { createFormModel } from '../../lib/models/form'

export type ImageDescriptionFormFields = {
  childProofImage: ImageFile | null
  imageFile: ImageFile | null
  title: string
  category: string
  age: string
}

const initialImageDescriptionFormFields: ImageDescriptionFormFields = {
  childProofImage: null,
  imageFile: null,
  age: '',
  title: '',
  category: '',
}

export const createPostFormModel = createFormModel(
  initialImageDescriptionFormFields
)
