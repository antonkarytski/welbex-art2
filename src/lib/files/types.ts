export enum FileType {
  IMAGE = 'image',
  FILE = 'file',
  AUDIO = 'audio',
  VIDEO = 'video',
}

export type ImageFile = {
  name: string
  size: number
  uri: string
}
