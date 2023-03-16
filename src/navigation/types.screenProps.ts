import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ImagePickerResult } from 'expo-image-picker'
import { ArtWork } from '../api/parts/arts/types'
import {
  ArtWorkPreviewResponse,
  CategoryResponse,
  SpecificCategoryResponse,
} from '../api/parts/categories/types'
import { UserShort } from '../api/parts/users/types'
import { GalleryType } from '../features/gallery/types'
import { InfoMessageScreenProps } from '../features/infoMessage/types'
import { PlanDescriptor } from '../features/subscriptionPlans/types'
import { links } from './links'

type ScreensPropsProto<T extends Partial<Record<links, any>>> = T &
  Record<Exclude<links, keyof T>, undefined>

export type ScreensProps = ScreensPropsProto<{
  [links.categoryDetails]: { item: CategoryResponse }
  [links.drawingDetails]: { item: ArtWorkPreviewResponse }
  [links.galleryDrawingDetails]: { item: ArtWork }
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
    has_phone_number: boolean
    has_date_of_birth: boolean
  }
}>

export type ScreenComponentProps<L extends links> = NativeStackScreenProps<
  ScreensProps,
  L
>
