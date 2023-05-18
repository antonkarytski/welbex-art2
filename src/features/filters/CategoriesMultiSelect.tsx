import React from 'react'
import { StyleSheet } from 'react-native'
import { StateModel } from 'altek-toolkit'
import { CategoryResponse } from '../../api/parts/categories/types'
import { useDropdownSelectPreset } from '../../styles/selects'
import { useText } from '../../translations/hook'
import Loader from '../../ui/loaders/Loader'
import DropdownMultiSelect from '../../ui/multiSelects/DropdownMultiSelect'
import { DropdownSelectStyles } from '../../ui/selects/types'
import { useCategoriesList } from '../categories/hook'

type CategoriesMultiSelectProps = {
  label?: string
  model: StateModel<CategoryResponse[]>
  style?: DropdownSelectStyles
}

const CategoriesMultiSelect = React.memo(
  ({ label, model, style }: CategoriesMultiSelectProps) => {
    const t = useText()
    const categories = useCategoriesList()
    const stylesPreset = useDropdownSelectPreset()

    return (
      <DropdownMultiSelect
        label={label ?? t.categories}
        tabLabel={({ items }) => {
          if (!items.length) return ''
          if (items.length === 1) return items[0].name
          return `${t.selected}: ${items?.length}`
        }}
        model={model}
        data={categories.items}
        labelExtractor={({ name }) => name}
        idExtractor={({ id }) => id?.toString()}
        style={{ dropdownTab: dropdownTabStyles, ...style }}
        preset={stylesPreset}
        onEndReached={categories.getNext}
        ListFooterComponent={categories.isLoading ? Loader : undefined}
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
