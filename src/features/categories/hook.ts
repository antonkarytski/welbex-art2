import { useStore } from 'effector-react'
import { useEffect } from 'react'
import { categoriesListModel } from './model'

export const useCategoriesList = () => {
  const items = useStore(categoriesListModel.$items)
  const isLoading = useStore(categoriesListModel.$isLoading)

  useEffect(() => {
    if (items.length) return
    categoriesListModel.getSync()
  }, [items])

  const getNext = () => {
    categoriesListModel.getNextSync()
  }

  return {
    items,
    isLoading,
    getNext,
  }
}
