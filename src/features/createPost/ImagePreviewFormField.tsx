import React from 'react'
import { Image } from 'react-native'
import {
  FormFieldComponentProps,
  useFormField,
} from '../../lib/componentsModels/model.form'

type ImagePreviewFormFieldProps<T extends Record<string, string>> =
  {} & FormFieldComponentProps<T>

const ImagePreviewFormField = <T extends Record<string, string>>({
  name,
  formModel,
}: ImagePreviewFormFieldProps<T>) => {
  const [value] = useFormField(formModel, name)

  return <Image source={{ uri: value }} style={{ width: 150, height: 150 }} />
}

export default ImagePreviewFormField
