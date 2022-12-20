import { createEvent, createStore } from 'effector'
import { Drawing } from '../drawing/types'
import { GalleryType } from './types'

type GalleriesList = Partial<Record<GalleryType, Drawing[]>>

type SetGalleryProps = {
  type: GalleryType
  drawings: Drawing[]
}
export const setGallery = createEvent<SetGalleryProps>()
export const addGalleryPage = createEvent<SetGalleryProps>()
export const $galleries = createStore<GalleriesList | null>(null)
  .on(setGallery, (state, { type, drawings }) => {
    const record = { [type]: drawings }
    if (!state) return record
    return { ...state, ...record }
  })
  .on(addGalleryPage, (state, { type, drawings }) => {
    const record = { [type]: drawings }
    if (!state) return record
    const currentRecord = state[type]
    if (!currentRecord) return { ...state, ...record }
    return { ...state, [type]: [...currentRecord, ...drawings] }
  })
