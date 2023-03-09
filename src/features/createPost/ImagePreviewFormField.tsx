import React from 'react'
import { Image, ImageStyle, StyleProp } from 'react-native'
import { ImageFile } from '../../lib/files/types'
import { useSpecificTypeFormField } from '../../lib/models/form'
import { TypedFormFieldComponentProps } from '../../lib/models/form/model.form'

type ImagePreviewFormFieldProps<
  T extends Record<string, any>,
  K extends keyof T
> = {
  style?: StyleProp<ImageStyle>
} & TypedFormFieldComponentProps<T, K, ImageFile | null>

const ImagePreviewFormField = <
  T extends Record<string, any>,
  K extends keyof T
>({
  name,
  formModel,
  style,
}: ImagePreviewFormFieldProps<T, K>) => {
  const [value] = useSpecificTypeFormField<T, ImageFile | null>(formModel, name)

  return <Image source={{ uri: value?.uri || undefined }} style={style} />
}

export default ImagePreviewFormField
