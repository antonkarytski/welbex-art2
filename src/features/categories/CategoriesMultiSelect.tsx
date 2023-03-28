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
import DropdownMultiSelect from '../../ui/multiSelects/DropdownMultiSelect'
import { DropdownSelectStyles } from '../../ui/selects/types'

const categoriesRequestModel = createPaginationListModel({
  request: api.categories.all,
  pageSize: 50,
})

type CategoriesMultiSelectProps = {
  label?: string
  model: StateModel<CategoryResponse[]>
  style?: DropdownSelectStyles
}

const CategoriesMultiSelect = React.memo(
  ({ label, model, style }: CategoriesMultiSelectProps) => {
    const t = useText()
    const categories = useStore(categoriesRequestModel.$items)
    const isLoading = useStore(categoriesRequestModel.$isLoading)
    const stylesPreset = useDropdownSelectPreset()

    useEffect(() => {
      categoriesRequestModel.get()
    }, [])

    const getNextCategories = () => {
      categoriesRequestModel.getNext()
    }

    return (
      <DropdownMultiSelect
        label={label ?? t.category}
        model={model}
        data={categories}
        labelExtractor={({ name }) => name}
        idExtractor={({ id }) => id?.toString()}
        style={{ dropdownTab: dropdownTabStyles, ...style }}
        preset={stylesPreset}
        onEndReached={getNextCategories}
        ListFooterComponent={isLoading ? Loader : undefined}
        tabLabel={t.selectValueFromList}
        selectedCounterLabel={t.selected}
        showSelectAllButtons
        selectAllLabel={t.selectAll}
        removeAllLabel={t.removeAll}
        showSelectedIcon
      />
    )
  }
)

const dropdownTabStyles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
})

export default CategoriesMultiSelect
