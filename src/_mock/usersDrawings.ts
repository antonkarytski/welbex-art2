import { UserDrawingListType } from '../features/user/types'
import { createRandomGallery } from './drawings'
import { reginaRomanovaFull, romanovFull } from './users'

const createRandomMultipagedGallery = (
  count: number,
  type: UserDrawingListType
) => {
  const lastPageElementsCount = count % 25
  const pagesCount = (count - lastPageElementsCount) / 25
  const pages = []
  const mod = (() => {
    if (type === UserDrawingListType.LIKED) {
      return { isSaved: true }
    }
    if (type === UserDrawingListType.SAVED) {
      return { isSaved: true }
    }
    return {}
  })()
  for (let i = 0; i < pagesCount; i++) {
    pages.push(createRandomGallery(`liked${i}`, 25, mod))
  }
  if (lastPageElementsCount) {
    pages.push(createRandomGallery(`liked${pages}`, lastPageElementsCount, mod))
  }
  return pages
}

export const USER_LIKED_GALLERY = createRandomMultipagedGallery(
  romanovFull.posts,
  UserDrawingListType.LIKED
)

export const USERS_DRAWINGS = {
  '1': {
    [UserDrawingListType.SAVED]: createRandomMultipagedGallery(
      100,
      UserDrawingListType.SAVED
    ),
    [UserDrawingListType.LIKED]: createRandomMultipagedGallery(
      100,
      UserDrawingListType.LIKED
    ),
    [UserDrawingListType.OWN]: createRandomMultipagedGallery(
      romanovFull.posts,
      UserDrawingListType.OWN
    ),
  },
  '2': {
    [UserDrawingListType.SAVED]: createRandomMultipagedGallery(
      100,
      UserDrawingListType.SAVED
    ),
    [UserDrawingListType.LIKED]: createRandomMultipagedGallery(
      100,
      UserDrawingListType.LIKED
    ),
    [UserDrawingListType.OWN]: createRandomMultipagedGallery(
      reginaRomanovaFull.posts,
      UserDrawingListType.OWN
    ),
  },
}

export const getUserDrawings = (
  id: number,
  type: UserDrawingListType,
  pageNumber: number
) => {
  const userLists = USERS_DRAWINGS[id.toString() as keyof typeof USERS_DRAWINGS]
  if (!userLists) return { result: null, next: null }
  const list = userLists[type]
  const page = list[pageNumber]
  if (!page) return { result: null, next: null }
  return { result: page, next: list[pageNumber + 1] ? pageNumber + 1 : null }
}
