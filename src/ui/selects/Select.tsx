import React, { useCallback } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import ListItemSeparator from '../lists/ListItemSeparator'
import SelectItem from './selectItem/SelectItem'
import { SelectProps } from './types'

type CommonSelectProps<Item> = SelectProps<Item> & {
  value: Item
  onSelect: (value: Item) => void
}
const Select = <Item,>({
  data,
  idExtractor,
  renderItem,
  style,
  ItemSeparatorComponent,
  showSelectedIcon,
  ListHeaderComponent,
  ListFooterComponent,
  labelExtractor,
  preset,
  onEndReached,
  stickyHeaderIndices,
  value,
  onSelect,
}: CommonSelectProps<Item>) => {
  const selectedId = value ? idExtractor(value) : null

  const renderSelect: ListRenderItem<Item> = useCallback(
    ({ item }) => (
      <SelectItem
        renderItem={renderItem}
        item={item}
        style={style?.item}
        onSelect={onSelect}
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
      onSelect,
      idExtractor,
      selectedId,
      labelExtractor,
      preset,
    ]
  )

  return (
    <FlatList
      bounces={false}
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
