import React from 'react'
import { Image, ImageStyle, StyleProp } from 'react-native'
import { useFormField } from '../../lib/models/form/hooks'
import { FormFieldComponentProps } from '../../lib/models/form/model.form'

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
