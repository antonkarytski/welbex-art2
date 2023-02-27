import { api } from '../../../api'
import { createRequestModel } from '../../../api/model.request'
import { $galleryFilterForm } from './model.galleryFilter'

export const countOfFilteredArtsRequest = createRequestModel(
  api.arts.countOfFiltered
)

$galleryFilterForm.watch((data) => {
  countOfFilteredArtsRequest.get(data)
})
