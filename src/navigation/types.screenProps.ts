import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ImagePickerResult } from 'expo-image-picker'
import { UserShort } from '../api/parts/users/types'
import { CompetitionCategory } from '../features/categories/types'
import { Drawing } from '../features/drawing/types'
import { GalleryType } from '../features/gallery/types'
import { InfoMessageScreenProps } from '../features/infoMessage/types'
import { PlanDescriptor } from '../features/subscriptionPlans/types'
import { links } from './links'

type ScreensPropsProto<T extends Partial<Record<links, any>>> = T &
  Record<Exclude<links, keyof T>, undefined>

export type ScreensProps = ScreensPropsProto<{
  [links.categoryDetails]: { item: CompetitionCategory }
  [links.drawingDetails]: { item: Drawing }
  [links.galleryDrawingDetails]: { item: Drawing }
  [links.galleryBest]: { type: GalleryType.BEST }
  [links.galleryNew]: { type: GalleryType.NEW }
  [links.galleryFollowing]: { type: GalleryType.FOLLOWING }
  [links.createPostAddDescription]: {
    assets: Exclude<ImagePickerResult['assets'], null>
  }
  [links.userProfile]: { item: UserShort }
  [links.infoMessage]: InfoMessageScreenProps
  [links.paymentMethod]?: { currentPayment?: PlanDescriptor }
  [links.addPaymentCard]?: { currentPayment?: PlanDescriptor }
}>

export type ScreenComponentProps<L extends links> = NativeStackScreenProps<
  ScreensProps,
  L
>
