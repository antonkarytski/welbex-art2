import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
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

const categoriesSelectRequest = createPaginationListModel({
  request: api.categories.all,
  pageSize: 50,
})

type CategoriesSelectProps = {
  label?: string
  model: StateModel<CategoryResponse | null>
  style?: DropdownSelectStyles
}

const CategoriesSelect = React.memo(
  ({ label, model, style }: CategoriesSelectProps) => {
    const t = useText()
    const categories = useStore(categoriesSelectRequest.$items)
    const isLoading = useStore(categoriesSelectRequest.$isLoading)
    const selectedCategory = useStore(model.$state)
    const stylesPreset = useDropdownSelectPreset()

    useEffect(() => {
      categoriesSelectRequest.get()
    }, [])

    useEffect(() => {
      if (!selectedCategory) {
        model.set(categories[0])
      }
    }, [categories, selectedCategory, model])

    const getNextCategories = () => {
      categoriesSelectRequest.getNext()
    }

    return (
      <DropdownSelect
        label={label ?? t.category}
        model={model}
        data={categories}
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
