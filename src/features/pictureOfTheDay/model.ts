import { api } from '../../api'
import { createRequestModel } from '../../lib/models/model.request'

const artOfTheDayModel = createRequestModel(api.arts.artOfTheDay)
