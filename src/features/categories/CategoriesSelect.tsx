import { useStore } from 'effector-react'
import React, { useEffect, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { StateModel } from 'altek-toolkit'
import { api } from '../../api'
import { CategoryResponse } from '../../api/parts/categories/types'
import { createPaginationListModel } from '../../lib/models/pagination'
import { useDropdownSelectPreset } from '../../styles/selects'
import { useText } from '../../translations/hook'
import Loader from '../../ui/loaders/Loader'
import DropdownSelect from '../../ui/selects/DropdownSelect'
import { DropdownSelectStyles } from '../../ui/selects/types'

const categoriesRequestModel = createPaginationListModel({
  request: api.categories.all,
  pageSize: 50,
})

type CategoriesSelectProps = {
  label?: string
  model: StateModel<CategoryResponse | null>
  style?: DropdownSelectStyles
  filter?: (category: CategoryResponse) => boolean
}

const CategoriesSelect = React.memo(
  ({ label, model, style, filter }: CategoriesSelectProps) => {
    const t = useText()
    const categories = useStore(categoriesRequestModel.$items)
    const isLoading = useStore(categoriesRequestModel.$isLoading)
    const selectedCategory = useStore(model.$state)
    const stylesPreset = useDropdownSelectPreset()

    console.log('HERE!!')

    const items = useMemo(() => {
      if (!filter) return categories
      return categories.filter(filter)
    }, [filter, categories])

    useEffect(() => {
      categoriesRequestModel.get()
    }, [])

    useEffect(() => {
      if (!selectedCategory) model.set(items[0])
    }, [items, selectedCategory, model])

    const getNextCategories = () => {
      categoriesRequestModel.getNext()
    }

    return (
      <DropdownSelect
        label={label ?? t.category}
        model={model}
        data={items}
        labelExtractor={({ name }) => name}
        idExtractor={({ id }) => id?.toString()}
        style={{ dropdownTab: dropdownTabStyles, ...style }}
        preset={stylesPreset}
        onEndReached={getNextCategories}
        ListFooterComponent={isLoading ? Loader : undefined}
        placeholder={t.selectValueFromList}
      />
    )
  }
)

const dropdownTabStyles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
})

export default CategoriesSelect
