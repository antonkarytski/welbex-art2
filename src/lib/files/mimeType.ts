import {
  AUDIO_FORMATS,
  FILE_FORMATS,
  IMAGE_FORMATS,
  VIDEO_FORMATS,
  getExtension,
} from './extensions'
import { FileType } from './types'

const imageConverter = {
  jpg: 'jpeg',
  tif: 'tiff',
}
const videoConverter = {
  '3gp': '3gpp',
  '3g2': '3gpp2',
}

const audioConverter = {
  mp3: 'mpeg',
  weba: 'webm',
  '3gp': '3gpp',
  '3g2': '3gpp2',
}
const fileConverter = {
  doc: 'msword',
  docx: 'vnd.openxmlformats-officedocument.wordprocessingml.document',
  rar: 'vnd.rar',
  '7z': 'x-7z-compressed',
}

type GetMimeProps = {
  extension: string
  isVideoPriority?: boolean
  type?: FileType
}

export function getMime(uri: string): string
export function getMime(uri: GetMimeProps): string
export function getMime(props: GetMimeProps | string) {
  if (typeof props === 'string') {
    const extension = getExtension(props)
    if (!extension) return '*/*'
    return getMime({ extension })
  }

  const { type, isVideoPriority, extension } = props

  if ((!type && IMAGE_FORMATS.includes(extension)) || type === 'image') {
    const mimeExt =
      extension in imageConverter
        ? imageConverter[extension as keyof typeof imageConverter]
        : extension
    return `image/${mimeExt}`
  }
  const isAudioFormat =
    type === 'audio' || (!type && AUDIO_FORMATS.includes(extension))
  const isVideoFormat =
    type === 'video' || (!type && VIDEO_FORMATS.includes(extension))

  if (
    (isVideoFormat && !isAudioFormat) ||
    (isVideoFormat && isAudioFormat && isVideoPriority)
  ) {
    const mimeExt =
      extension in videoConverter
        ? videoConverter[extension as keyof typeof videoConverter]
        : extension
    return `video/${mimeExt}`
  }

  if (isAudioFormat) {
    const mimeExt =
      extension in audioConverter
        ? audioConverter[extension as keyof typeof audioConverter]
        : extension
    return `audio/${mimeExt}`
  }

  if (FILE_FORMATS.includes(extension)) {
    const mimeExt =
      extension in fileConverter
        ? fileConverter[extension as keyof typeof fileConverter]
        : extension
    return `application/${mimeExt}`
  }

  return '*/*'
}
