import React, { useCallback } from 'react'
import { FlatList, ListRenderItem, View } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import ListItemSeparator from '../lists/ListItemSeparator'
import SelectItem from './SelectItem'
import { selectStyles } from './styles'
import { SelectProps } from './types'

const Select = <Item,>({
  data,
  idExtractor,
  renderItem,
  model,
  style,
  ItemSeparatorComponent,
  showSelectedIcon,
  ListFooterComponent,
  labelExtractor,
}: SelectProps<Item>) => {
  const [selectedItem, setSelectedItem] = useStateStore(model)

  const selectedId = idExtractor(selectedItem)
  const renderSelect: ListRenderItem<Item> = useCallback(
    ({ item }) => (
      <SelectItem
        renderItem={renderItem}
        item={item}
        style={style?.item}
        onSelect={setSelectedItem}
        isSelected={selectedId === idExtractor(item)}
        showSelectedIcon={showSelectedIcon}
        labelExtractor={labelExtractor}
      />
    ),
    [
      renderItem,
      showSelectedIcon,
      style,
      setSelectedItem,
      idExtractor,
      selectedId,
      labelExtractor,
    ]
  )

  return (
    <View style={[selectStyles.listWrapper, style?.listWrapper]}>
      <FlatList
        data={data}
        renderItem={renderSelect}
        keyExtractor={idExtractor}
        ItemSeparatorComponent={
          ItemSeparatorComponent === null ? undefined : ListItemSeparator
        }
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  )
}

export default Select
