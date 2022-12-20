import { GalleryType } from '../features/gallery/types'
import { createRandomGallery } from './drawings'

export const MOCK_GALLERY_REQUEST = {
  [GalleryType.NEW]: [
    createRandomGallery('New1'),
    createRandomGallery('New2'),
    createRandomGallery('New3', 5),
  ],
  [GalleryType.BEST]: [
    createRandomGallery('Best1'),
    createRandomGallery('Best2'),
    createRandomGallery('Best3', 5),
  ],
  [GalleryType.FOLLOWING]: [createRandomGallery('Follow1', 3)],
}

export const mockGetGallery = (type: GalleryType, page: string = '1') => {
  const list = MOCK_GALLERY_REQUEST[type]
  return {
    data: MOCK_GALLERY_REQUEST[type][+page - 1],
    next: list.length > +page ? (+page + 1).toString() : null,
  }
}
