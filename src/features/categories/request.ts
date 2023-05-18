import { api } from '../../api'
import { withLanguageModel } from '../../translations/model.languages'

export const getLocalizedCategories = withLanguageModel(api.categories.all)
