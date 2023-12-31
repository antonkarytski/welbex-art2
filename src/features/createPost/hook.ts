import { useStoreMap } from 'effector-react'
import { ImagePickerAsset } from 'expo-image-picker'
import { useEffect } from 'react'
import { CategoryResponse } from '../../api/parts/categories/types'
import { MyProfile } from '../../api/parts/users/types'
import { IdentityDocumentStatus } from '../../api/parts/users/types.api'
import { getNameFromUrl } from '../../lib/files/helpers'
import { $myProfile } from '../profile/model'
import { getAgeCategory } from './helpers'
import { createPostFormModel } from './model'
import { selectedCategoryModel } from './model.categorySelect'

export type CreatePostFormInitialProps = {
  category?: CategoryResponse
  assets?: ImagePickerAsset[]
}

const isDocumentUploaded = (profile: MyProfile) => {
  return (
    profile.identity_determined_status_id ===
      IdentityDocumentStatus.DETERMINED ||
    profile.identity_determined_status_id === IdentityDocumentStatus.PENDING
  )
}

export function useCreatePostFormInitialValues({
  category,
  assets,
}: CreatePostFormInitialProps) {
  const initialCategory = useStoreMap({
    store: selectedCategoryModel.$state,
    keys: [],
    fn: (selectedCategory) => ({
      categoryId: selectedCategory?.id || 0,
    }),
  })
  const initialFormData = useStoreMap({
    store: $myProfile,
    keys: [],
    fn: (profile) =>
      !profile?.age
        ? null
        : {
            isChildDocumentLoaded: isDocumentUploaded(profile),
            age: getAgeCategory(profile.age).join(' - '),
          },
    updateFilter: (update, current) => !!update && !current,
  })

  useEffect(() => {
    const asset = assets?.[0]
    if (!asset) return
    createPostFormModel.setField({
      value: {
        name: asset.fileName || getNameFromUrl(asset.uri),
        size: asset.fileSize || 0,
        uri: asset.uri,
      },
      key: createPostFormModel.fields.image,
    })
  }, [assets])

  useEffect(() => {
    if (!initialFormData) return
    createPostFormModel.setSomeFields({
      ...initialFormData,
      ...initialCategory,
    })
  }, [initialFormData, initialCategory])

  useEffect(() => {
    if (category) selectedCategoryModel.set(category)
  }, [category])
}
