import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ImagePickerResult } from 'expo-image-picker'
import {
  ArtWorkPreviewResponse,
  CategoryResponse,
  SpecificCategoryResponse,
} from '../api/parts/categories/types'
import { UserShort } from '../api/parts/users/types'
import { ProfileEditProps } from '../api/parts/users/types.parts'
import { GalleryType } from '../features/gallery/types'
import { InfoMessageScreenProps } from '../features/infoMessage/types'
import { PlanDescriptor } from '../features/subscriptionPlans/types'
import { links } from './links'

type ScreensPropsProto<T extends Partial<Record<links, any>>> = T &
  Record<Exclude<links, keyof T>, undefined>

export type ScreensProps = ScreensPropsProto<{
  [links.categoryDetails]: { item: CategoryResponse }
  [links.artWorkDetails]: { item: ArtWorkPreviewResponse }
  [links.galleryBest]: { type: GalleryType.BEST }
  [links.galleryNew]: { type: GalleryType.NEW }
  [links.galleryFollowing]: { type: GalleryType.FOLLOWING }
  [links.createPostAddDescription]: {
    assets: Exclude<ImagePickerResult['assets'], null>
    category?: SpecificCategoryResponse
  }
  [links.userProfile]: { item: UserShort }
  [links.infoMessage]: InfoMessageScreenProps
  [links.paymentMethod]?: { currentPayment?: PlanDescriptor }
  [links.addPaymentCard]?: { currentPayment?: PlanDescriptor }
  [links.createPostUploadImage]?: {
    category?: SpecificCategoryResponse
  }
  [links.authSubmit]: {
    access_token: string
    refresh_token: string
    absent_fields: (keyof ProfileEditProps)[]
  }
  [links.createNewPassword]: {
    token: string
  }
}>

export type ScreenComponentProps<L extends links> = NativeStackScreenProps<
  ScreensProps,
  L
>
