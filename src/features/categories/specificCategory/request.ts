import { attach, createEffect, sample } from 'effector'
import { debounce } from 'patronum'
import { AllArtWorksProps } from '../../../api/parts/arts/types'
import { SpecificCategoryProps } from '../../../api/parts/categories/types'
import { noop } from '../../../lib/helpers'
import { languageModel } from '../../../translations/model.languages'
import { Languages } from '../../../translations/types'
import {
  $categoryArtsSearchString,
  $categoryId,
  categoryArtsModel,
  categoryDetailsModel,
  setCategoryArtsSearchString,
} from './model'

type RequestCategoryDataProps = {
  categoryId: number
  searchString?: string
  language?: Languages
}

const prepareParams = ({
  categoryId,
  searchString,
  language,
}: RequestCategoryDataProps): AllArtWorksProps => {
  return {
    category_ids: categoryId,
    title: searchString || undefined,
    language,
  }
}

const categoryDataRequest = (
  requestFx: (params: RequestCategoryDataProps) => void
) =>
  attach({
    source: $categoryArtsSearchString,
    mapParams: (categoryId: number, searchString: string) => ({
      categoryId,
      searchString,
    }),
    effect: createEffect((params: RequestCategoryDataProps) =>
      requestFx(params)
    ),
  })

export const getNextCategoryArts = categoryDataRequest(
  (props: RequestCategoryDataProps) =>
    categoryArtsModel.getNext(prepareParams(props)).catch(noop)
)

const debounceSearch = debounce({
  source: setCategoryArtsSearchString,
  timeout: 400,
})

const searchCategoryArtsFx = createEffect(
  (params: RequestCategoryDataProps) => {
    categoryArtsModel.get(prepareParams(params)).catch(noop)
  }
)

sample({
  clock: debounceSearch,
  source: { searchString: $categoryArtsSearchString, categoryId: $categoryId },
  filter: (props): props is { categoryId: number; searchString: string } =>
    props.categoryId !== null,
  target: searchCategoryArtsFx,
})

const getCategoryArts = attach({
  source: {
    searchString: $categoryArtsSearchString,
    language: languageModel.$state,
  },
  mapParams: (
    categoryId: number,
    params: Omit<RequestCategoryDataProps, 'categoryId'>
  ) => ({
    categoryId,
    ...params,
  }),
  effect: searchCategoryArtsFx,
})

export const getCategoryData = attach({
  source: languageModel.$state,
  mapParams: (categoryId: number, language: Languages) => ({
    id: categoryId,
    language,
  }),
  effect: createEffect(({ id, language }: SpecificCategoryProps) => {
    return Promise.all([
      categoryDetailsModel.get({ id, language }),
      getCategoryArts(id),
    ])
  }),
})
