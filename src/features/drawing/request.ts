import { api } from '../../api'
import { createRequestModel } from '../../api/model.request'

export const artWorkRequest = createRequestModel(api.arts.specific)
