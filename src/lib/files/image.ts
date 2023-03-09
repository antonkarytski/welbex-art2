import { getMime } from './mimeType'
import { ImageFile } from './types'

export function imageToFile(imageFile: ImageFile) {
  return {
    ...imageFile,
    type: getMime(imageFile.uri),
  } as any
}
