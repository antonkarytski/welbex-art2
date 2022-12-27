import React, { ReactNode, useMemo } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import DropdownTab from '../dropdownTab'
import { DropdownStyles } from '../dropdownTab/types'
import SelectItem from './SelectItem'
import { SelectModel } from './model'
import { selectStyles } from './styles'

type SelectProps<DataItem> = {
  label?: string | ReactNode
  data: DataItem[]
  renderItem: (item: DataItem) => ReactNode
  model: SelectModel
  placeholder?: string
  idExtractorName?: keyof DataItem
  nameExtractorName?: keyof DataItem
  dropdownStyles?: DropdownStyles
}

function Select<DataItem extends Record<string, any>>({
  label,
  data,
  renderItem,
  placeholder = 'Выберите значение из списка',
  idExtractorName = 'id',
  nameExtractorName = 'name',
  model,
  dropdownStyles,
}: SelectProps<DataItem>) {
  const [selectedItemId, setSelectedItemId] = useStateStore(model)

  const selectedItemName = useMemo(
    () =>
      data.find(
        (item) => String(selectedItemId) === String(item[idExtractorName])
      )?.[nameExtractorName],
    [data, selectedItemId, idExtractorName, nameExtractorName]
  )

  const preRenderItem: ListRenderItem<DataItem> = ({ item }) => (
    <SelectItem
      renderItem={renderItem}
      item={item}
      itemId={item[idExtractorName]}
      selectedItemId={selectedItemId}
      setSelectedItemId={setSelectedItemId}
    />
  )

  return (
    <DropdownTab
      label={label}
      tabLabel={selectedItemName ?? placeholder}
      styles={dropdownStyles}
    >
      <FlatList
        data={data}
        renderItem={preRenderItem}
        keyExtractor={(item) => item[idExtractorName]?.toString()}
        style={[selectStyles.list]}
        // contentContainerStyle={styles.listContainer}
      />
    </DropdownTab>
  )
}

export default Select
