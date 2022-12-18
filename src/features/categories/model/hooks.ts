import { useStoreMap } from 'effector-react'
import { useEffect } from 'react'
import { MOCK_CATEGORIES_DETAILS } from '../../../_mock/categories'
import { $categoriesDetails, addCategoryToList } from './model.list'

export function useCategoryGallery(categoryName: string) {
  const category = useStoreMap({
    store: $categoriesDetails,
    keys: [categoryName],
    fn: (list) => {
      return list?.[categoryName] ?? null
    },
  })

  //MOCK, here should to be a request
  useEffect(() => {
    if (category) return
    const details = MOCK_CATEGORIES_DETAILS.find(
      ({ name }) => name === categoryName
    )
    if (details) addCategoryToList(details)
  }, [categoryName, category])

  return category?.images ?? []
}
