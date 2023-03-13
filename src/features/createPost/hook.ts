import { useStoreMap } from 'effector-react'
import { ImagePickerAsset } from 'expo-image-picker'
import { useEffect } from 'react'
import { CategoryResponse } from '../../api/parts/categories/types'
import { MyProfile } from '../../api/parts/users/types'
import { IdentityDocumentStatus } from '../../api/parts/users/types.api'
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
  const initialFormData = useStoreMap({
    store: $myProfile,
    keys: [],
    fn: (profile) =>
      !profile
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
