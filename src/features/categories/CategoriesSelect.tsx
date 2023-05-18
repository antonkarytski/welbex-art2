import { useStore } from 'effector-react'
import React, { useEffect, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { StateModel } from 'altek-toolkit'
import { CategoryResponse } from '../../api/parts/categories/types'
import { useDropdownSelectPreset } from '../../styles/selects'
import { useText } from '../../translations/hook'
import Loader from '../../ui/loaders/Loader'
import DropdownSelect from '../../ui/selects/DropdownSelect'
import { DropdownSelectStyles } from '../../ui/selects/types'
import { useCategoriesList } from './hook'

type CategoriesSelectProps = {
  label?: string
  model: StateModel<CategoryResponse | null>
  style?: DropdownSelectStyles
  filter?: (category: CategoryResponse) => boolean
}

const CategoriesSelect = React.memo(
  ({ label, model, style, filter }: CategoriesSelectProps) => {
    const t = useText()
    const categories = useCategoriesList()
    const selectedCategory = useStore(model.$state)
    const stylesPreset = useDropdownSelectPreset()

    const items = useMemo(() => {
      if (!filter) return categories.items
      return categories.items.filter(filter)
    }, [filter, categories.items])

    useEffect(() => {
      if (!selectedCategory) model.set(items[0])
    }, [items, selectedCategory, model])

    return (
      <DropdownSelect
        label={label ?? t.category}
        model={model}
        data={items}
        labelExtractor={({ name }) => name}
        idExtractor={({ id }) => id?.toString()}
        style={{ dropdownTab: dropdownTabStyles, ...style }}
        preset={stylesPreset}
        onEndReached={categories.getNext}
        ListFooterComponent={categories.isLoading ? Loader : undefined}
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
