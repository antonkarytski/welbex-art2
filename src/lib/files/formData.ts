import { DocumentResult } from 'expo-document-picker'
import { imageToFile } from './image'
import { ImageFile } from './types'

type CreateFormDataProps = Record<
  string,
  string | number | boolean | ImageFile | ImageFile[]
>

export function formDataFromList(list: CreateFormDataProps) {
  const formData = new FormData()
  for (const key in list) {
    const value = list[key]
    if (Array.isArray(value)) {
      value.map((item) => {
        formData.append(key, imageToFile(item as ImageFile))
      })
    } else if (typeof value === 'object') {
      formData.append(key, imageToFile(value))
    } else {
      formData.append(key, value.toString())
    }
  }
  return formData
}
