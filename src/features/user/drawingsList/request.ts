import { api } from '../../../api'
import { ARTS_PAGE_SIZE } from '../../../api/constants'
import { createPaginationListModel } from '../../../lib/models/pagination'
import { UserDrawingListType } from '../types'
import { UserArtsListsRequestModel } from './types'

export const createUserArtsListsRequestModel =
  (): UserArtsListsRequestModel => {
    const userAllArtsModel = createPaginationListModel({
      request: api.arts.userAllArts,
      pageSize: ARTS_PAGE_SIZE,
    })

    const userLikedArtsModel = createPaginationListModel({
      request: api.arts.userLikedArts,
      pageSize: ARTS_PAGE_SIZE,
    })

    const userSavedArtsModel = createPaginationListModel({
      request: api.arts.userSavedArts,
      pageSize: ARTS_PAGE_SIZE,
    })

    const reset = () => {
      userAllArtsModel.reset()
      userLikedArtsModel.reset()
      userSavedArtsModel.reset()
    }

    return {
      reset,
      model: {
        [UserDrawingListType.OWN]: userAllArtsModel,
        [UserDrawingListType.LIKED]: userLikedArtsModel,
        [UserDrawingListType.SAVED]: userSavedArtsModel,
      },
    }
  }
