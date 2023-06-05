import { api } from '../../api'
import { createRequestModel } from '../../lib/models/model.request'

export const artOfTheDayModel = createRequestModel(api.arts.artOfTheDay)
