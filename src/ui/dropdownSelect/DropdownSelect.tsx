import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import DropdownTab from '../dropdownTab'
import SelectItem from './SelectItem'
import { selectStyles } from './styles'
import { SelectProps } from './types'

function Select<DataItem>({
  label,
  data,
  renderItem,
  placeholder = 'Выберите значение из списка',
  idExtractor,
  labelExtractor,
  model,
  dropdownStyles,
}: SelectProps<DataItem>) {
  const [selectedItem, setSelectedItem] = useStateStore(model)

  const selectedId = idExtractor(selectedItem)
  const preRenderItem: ListRenderItem<DataItem> = ({ item }) => (
    <SelectItem
      renderItem={renderItem}
      item={item}
      isActive={idExtractor(item) === selectedId}
      onSelect={setSelectedItem}
    />
  )

  return (
    <DropdownTab
      label={label}
      tabLabel={labelExtractor?.(selectedItem) ?? placeholder}
      styles={dropdownStyles}
    >
      <FlatList
        data={data}
        renderItem={preRenderItem}
        keyExtractor={idExtractor}
        style={[selectStyles.list]}
      />
    </DropdownTab>
  )
}

export default Select
