import { api } from '../../api'
import { createRequestItemModel } from '../../api/model.request'

export const artWorkRequest = createRequestItemModel(api.arts.specific)
