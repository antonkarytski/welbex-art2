import { createEvent, createStore } from 'effector'
import { ArtWork } from '../../api/parts/arts/types'
import { GalleriesList, GallerySetter } from './types'

type GalleriesDrawingsList = GalleriesList<ArtWork[]>
type SetGalleryProps = GallerySetter<{
  drawings: ArtWork[]
}>

export const setGallery = createEvent<SetGalleryProps>()
export const addGalleryPage = createEvent<SetGalleryProps>()
export const $galleries = createStore<GalleriesDrawingsList | null>(null)
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
