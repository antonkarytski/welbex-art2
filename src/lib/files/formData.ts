import { imageToFile } from './image'
import { ImageFile } from './types'

type CreateFormDataProps = Record<string, string | number | ImageFile>

export function formDataFromList(list: CreateFormDataProps) {
  const formData = new FormData()
  for (const key in list) {
    const value = list[key]
    formData.append(
      key,
      typeof value === 'object' ? imageToFile(value) : value.toString()
    )
  }
  return formData
}
