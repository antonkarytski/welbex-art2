import { attach, createEffect, sample } from 'effector'
import { debounce } from 'patronum'
import { AllArtWorksProps } from '../../../api/parts/arts/types'
import {
  $categoryArtsSearchString,
  $categoryId,
  categoryArtsModel,
  categoryDetailsModel,
  setCategoryArtsSearchString,
} from './model'

export const getCategoryData = (categoryId: number) => {
  return Promise.all([
    categoryDetailsModel.get(categoryId),
    categoryArtsModel.get({
      category_ids: categoryId,
    }),
  ])
}

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

// export const getCategoryArts = categoryDataRequest(
//   (props: RequestCategoryDataProps) =>
//     categoryArtsModel.get(prepareParams(props))
// )

export const getNextCategoryArts = categoryDataRequest(
  (props: RequestCategoryDataProps) =>
    categoryArtsModel.getNext(prepareParams(props))
)

const debounceSearch = debounce({
  source: setCategoryArtsSearchString,
  timeout: 400,
})

const searchCategoryArtsFx = createEffect(
  (params: RequestCategoryDataProps) => {
    categoryArtsModel.get(prepareParams(params))
  }
)

sample({
  clock: debounceSearch,
  source: { searchString: $categoryArtsSearchString, categoryId: $categoryId },
  filter: (props): props is { categoryId: number; searchString: string } =>
    props.categoryId !== null,
  target: searchCategoryArtsFx,
})
