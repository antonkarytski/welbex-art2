export const IMAGE_FORMATS = [
  'bmp',
  'gif',
  'jpg',
  'jpeg',
  'png',
  'tif',
  'tiff',
  'webp',
]
export const VIDEO_FORMATS = ['mp4', 'mpeg', 'webm', '3gp', '3g2']
export const AUDIO_FORMATS = ['mp3', 'wav', 'weba', 'mp4', 'm4a', '3gp']
export const FILE_FORMATS = ['doc', 'docx', 'pdf', 'rar', 'rtf', 'zip', '7z']

export function isExtensionAudio(extension: string) {
  return AUDIO_FORMATS.includes(extension)
}

export function isExtensionImage(extension: string) {
  return IMAGE_FORMATS.includes(extension)
}

export function getExtension(uri: string) {
  return uri.match(/\.(\w+)$/)?.[1]
}
