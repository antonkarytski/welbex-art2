import { createRequestModel } from '../../lib/models/model.request'
import { getArtWorkRequest } from './request'

export const artWorkDetailsModel = createRequestModel(getArtWorkRequest)
