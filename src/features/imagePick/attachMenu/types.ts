import { MutableRefObject } from 'react'
import { Fn } from 'altek-toolkit'
import { ImageEditorType } from 'altek-ui'
import { PhotoOptions } from '../camera/types'

export type Document = {
  name: string
  size?: number
  uri: string
  lastModified?: number | undefined
  file?: File | undefined
  output?: FileList | null | undefined
}
export type ImageFilesData = {
  type: 'image'
  data: string[]
  options?: PhotoOptions
}
export type DocumentFilesData = {
  type: 'file'
  data: Document
}

export type AttachMenuImages = {
  type: 'image'
  data: ImageNode[]
  options?: PhotoOptions
}

export type PickFilesData = DocumentFilesData | ImageFilesData

export type AttachMenuPickResult = DocumentFilesData | AttachMenuImages

export type AttachMenuButtons = {
  gallery?: boolean
  files?: boolean
  location?: boolean
}
export type AttachMenuController = {
  close: () => void
}

export type ImagePickMiddleware = (uri: string) => Promise<string>

export type AttachMenuProps = {
  postHandler?: ImageEditorType
  mountBlock?: boolean
  buttons?: AttachMenuButtons
  onSelectComplete: (files: AttachMenuPickResult) => void
  controller?: MutableRefObject<AttachMenuController | null>
  middleware?: ImagePickMiddleware[]
  onOpen?: Fn
  pickLimit?: number
}
export type ImageNode = {
  timestamp: number
  uri: string
  size: number | null
  name: string | null
}
