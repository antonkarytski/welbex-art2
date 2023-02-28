import { api } from '../../../api'
import { createRequestModel } from '../../../api/model.request'

export const countOfFilteredArtsModel = createRequestModel(
  api.arts.countOfFiltered
)
