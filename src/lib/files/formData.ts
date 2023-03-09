import { imageToFile } from './image'
import { ImageFile } from './types'

type CreateFormDataProps = Record<string, string | number | ImageFile>

export function formDataFromList(list: CreateFormDataProps) {
  const formData = new FormData()
  for (const key in list) {
    const value = list[key]
    if (typeof value === 'object') {
      formData.append('image', imageToFile(value))
    } else {
      formData.append(key, value.toString())
    }
  }
  return formData
}
