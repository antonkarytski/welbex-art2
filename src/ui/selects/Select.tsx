import React, { useCallback } from 'react'
import { FlatList, ListRenderItem, View } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import ListItemSeparator from '../lists/ListItemSeparator'
import SelectItem from './selectItem/SelectItem'
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
  preset,
  onEndReached,
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
    <View style={[selectStyles.container, style?.container]}>
      <FlatList
        data={data}
        renderItem={renderSelect}
        keyExtractor={idExtractor}
        ItemSeparatorComponent={
          ItemSeparatorComponent === null ? undefined : ListItemSeparator
        }
        ListFooterComponent={ListFooterComponent}
        onEndReached={onEndReached}
      />
    </View>
  )
}

export default Select
