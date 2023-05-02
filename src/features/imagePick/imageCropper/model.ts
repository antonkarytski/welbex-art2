import { createEvent, restore, sample } from 'effector'
import { createEffect } from 'effector/effector.umd'
import { ImagePickerAsset } from 'expo-image-picker'
import { getNameFromUrl } from '../../../lib/files/helpers'
import { convertToFile } from './helpers'

export enum ImageCropResultErrorCode {
  CANCELED_EDIT = 'CANCELED_EDIT',
  CANCELED_PICK = 'CANCELED_PICK',
}

type ImageCropResultSuccess = {
  uri: string
  width: number
  height: number
}

type ImageCropResultError = Partial<ImageCropResultSuccess> & {
  errorCode: ImageCropResultErrorCode
}

type ImageCropResult =
  | (ImageCropResultSuccess & { errorCode?: never })
  | ImageCropResultError

type ImageCropTask = {
  asset: ImagePickerAsset
  promise: {
    resolve: (props: ImagePickerAsset) => void
    reject: (error: any) => void
  }
}

const setImageCropTask = createEvent<ImageCropTask | null>()
export const $imageCropTask = restore(setImageCropTask, null)

export const runImageCropperWithTask = createEffect(
  (task: Omit<ImageCropTask, 'promise'>) => {
    return new Promise<ImagePickerAsset>((resolve, reject) => {
      setImageCropTask({
        ...task,
        promise: { resolve, reject },
      })
    })
  }
)

export const runCropper = (assets: ImagePickerAsset[]) => {
  return runImageCropperWithTask({ asset: assets[0] })
    .then((result) => [convertToFile(result)])
    .catch((error) => {
      if (error.message === ImageCropResultErrorCode.CANCELED_EDIT) {
        return assets
      }
      if (error.message === ImageCropResultErrorCode.CANCELED_PICK) {
        return
      }
    })
}

export const finishImageCropping = createEvent<ImageCropResult>()
sample({
  source: $imageCropTask,
  clock: finishImageCropping,
  fn: (task, result) => ({ task, result }),
}).watch(({ task, result }) => {
  if (!task) return
  setImageCropTask(null)
  if (result.errorCode) {
    task.promise.reject(new Error(result.errorCode))
    return
  }
  const asset: ImagePickerAsset = {
    ...task.asset,
    ...result,
    fileName: task.asset.fileName || getNameFromUrl(task.asset.uri),
  }
  task.promise.resolve(asset)
})
