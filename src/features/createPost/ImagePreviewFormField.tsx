import React from 'react'
import { Image, ImageStyle, StyleProp } from 'react-native'
import {
  FormFieldComponentProps,
  useFormField,
} from '../../lib/models/model.form'

type ImagePreviewFormFieldProps<T extends Record<string, string>> = {
  style?: StyleProp<ImageStyle>
} & FormFieldComponentProps<T>

const ImagePreviewFormField = <T extends Record<string, string>>({
  name,
  formModel,
  style,
}: ImagePreviewFormFieldProps<T>) => {
  const [value] = useFormField(formModel, name)

  return <Image source={{ uri: value || undefined }} style={style} />
}

export default ImagePreviewFormField
