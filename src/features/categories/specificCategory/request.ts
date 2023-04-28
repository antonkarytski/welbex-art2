import { attach, createEffect, sample } from 'effector'
import { debounce } from 'patronum'
import { AllArtWorksProps } from '../../../api/parts/arts/types'
import { noop } from '../../../lib/helpers'
import {
  $categoryArtsSearchString,
  $categoryId,
  categoryArtsModel,
  categoryDetailsModel,
  setCategoryArtsSearchString,
} from './model'

type RequestCategoryDataProps = {
  categoryId: number
  searchString: string
}

const prepareParams = ({
  categoryId,
  searchString,
}: RequestCategoryDataProps): AllArtWorksProps => {
  return {
    category_ids: categoryId,
    title: searchString || undefined,
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
  source: $categoryArtsSearchString,
  mapParams: (categoryId: number, searchString: string) => ({
    categoryId,
    searchString,
  }),
  effect: searchCategoryArtsFx,
})

export const getCategoryData = (categoryId: number) => {
  return Promise.all([
    categoryDetailsModel.get(categoryId),
    getCategoryArts(categoryId),
  ])
}
