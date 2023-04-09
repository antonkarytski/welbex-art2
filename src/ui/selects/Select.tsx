import React, { useCallback } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import ListItemSeparator from '../lists/ListItemSeparator'
import SelectItem from './selectItem/SelectItem'
import { SelectProps } from './types'

const Select = <Item,>({
  data,
  idExtractor,
  renderItem,
  model,
  style,
  ItemSeparatorComponent,
  showSelectedIcon,
  ListHeaderComponent,
  ListFooterComponent,
  labelExtractor,
  preset,
  onEndReached,
  stickyHeaderIndices,
}: SelectProps<Item>) => {
  const [selectedItem, setSelectedItem] = useStateStore(model)

  const selectedId = selectedItem ? idExtractor(selectedItem) : null

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
        preset={preset}
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
      preset,
    ]
  )

  return (
    <FlatList
      data={data}
      renderItem={renderSelect}
      keyExtractor={idExtractor}
      ItemSeparatorComponent={
        ItemSeparatorComponent === null ? undefined : ListItemSeparator
      }
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      stickyHeaderIndices={stickyHeaderIndices}
      onEndReached={onEndReached}
      scrollEnabled={true}
      contentContainerStyle={style?.container}
    />
  )
}

export default Select
