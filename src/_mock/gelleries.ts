import { Drawing } from '../features/drawing/types'
import { GalleryType } from '../features/gallery/types'
import { createRandomDrawing } from './drawings'

const createRandomGallery = (galleryId: string, size = 10) => {
  return Array(size)
    .fill(null)
    .map((_, index) => createRandomDrawing(index + 'stone' + galleryId))
}

export const MOCK_BEST_GALLERY: Drawing[] = createRandomGallery('Best1')
export const MOCK_BEST_GALLERY_2: Drawing[] = createRandomGallery('Best2')
export const MOCK_BEST_GALLERY_3: Drawing[] = createRandomGallery('Best3', 5)

export const MOCK_FOLLOW_GALLERY: Drawing[] = createRandomGallery('Follow1', 3)

export const MOCK_NEW_GALLERY: Drawing[] = createRandomGallery('Follow1')
export const MOCK_NEW_GALLERY_2: Drawing[] = createRandomGallery('Follow1')
export const MOCK_NEW_GALLERY_3: Drawing[] = createRandomGallery('Follow1', 1)

export const MOCK_GALLERY_REQUEST = {
  [GalleryType.NEW]: [MOCK_NEW_GALLERY, MOCK_NEW_GALLERY_2, MOCK_NEW_GALLERY_3],
  [GalleryType.BEST]: [
    MOCK_BEST_GALLERY,
    MOCK_BEST_GALLERY_2,
    MOCK_BEST_GALLERY_3,
  ],
  [GalleryType.FOLLOWING]: [MOCK_FOLLOW_GALLERY],
}

export const mockGetGallery = (type: GalleryType, page: string = '1') => {
  const list = MOCK_GALLERY_REQUEST[type]
  return {
    data: MOCK_GALLERY_REQUEST[type][+page - 1],
    next: list.length > +page ? (+page + 1).toString() : null,
  }
}
