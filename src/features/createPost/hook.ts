import { useStoreMap } from 'effector-react'
import { ImagePickerAsset } from 'expo-image-picker'
import { useEffect } from 'react'
import { CategoryResponse } from '../../api/parts/categories/types'
import { $myProfile } from '../profile/model'
import { getAgeCategory } from './helpers'
import { createPostFormModel } from './model'
import { selectedCategoryModel } from './model.categorySelect'

export type CreatePostFormInitialProps = {
  category?: CategoryResponse
  assets?: ImagePickerAsset[]
}

export function useCreatePostFormInitialValues({
  category,
  assets,
}: CreatePostFormInitialProps) {
  const initialFormData = useStoreMap({
    store: $myProfile,
    keys: [],
    fn: (profile) =>
      !profile
        ? null
        : {
            isChildDocumentLoaded: profile?.identity_determined,
            age: getAgeCategory(profile.age).join(' - '),
          },
    updateFilter: (update, current) => {
      return (
        update?.isChildDocumentLoaded !== current?.isChildDocumentLoaded ||
        update?.age !== current?.age
      )
    },
  })

  useEffect(() => {
    const asset = assets?.[0]
    if (!asset) return
    createPostFormModel.setField({
      value: {
        name: asset.fileName || '',
        size: asset.fileSize || 0,
        uri: asset.uri,
      },
      key: createPostFormModel.fields.image,
    })
  }, [assets])

  useEffect(() => {
    if (!initialFormData) return
    createPostFormModel.setSomeFields(initialFormData)
  }, [initialFormData])

  useEffect(() => {
    if (category) selectedCategoryModel.set(category)
  }, [category])
}
