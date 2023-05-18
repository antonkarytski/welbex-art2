import { attach } from 'effector'
import { api } from '../../api'
import { PaginatedListProps } from '../../api/types'
import { languageModel } from '../../translations/model.languages'

export const getLocalizedCategories = attach({
  source: languageModel.$state,
  mapParams: (params: PaginatedListProps | void, language) => ({
    language,
    ...params,
  }),
  effect: api.categories.all,
})
