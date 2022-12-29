import React, { useCallback } from 'react'
import { FlatList, ListRenderItem, View } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import ListItemSeparator from './ListItemSeparator'
import SelectItem from './SelectItem'
import { selectStyles } from './styles'
import { ItemId, SelectProps } from './types'

const Select = <Item,>({
  data,
  idExtractor,
  renderItem,
  model,
  styles,
  ItemSeparatorComponent,
  showSelectedIcon,
}: SelectProps<Item>) => {
  const [selectedItemId, setSelectedItemId] = useStateStore(model)

  const checkIsSelected = useCallback(
    (itemId: ItemId) => String(selectedItemId) === String(itemId),
    [selectedItemId]
  )

  const preRenderItem: ListRenderItem<Item> = useCallback(
    ({ item }) => (
      <SelectItem
        renderItem={renderItem}
        item={item}
        idExtractor={idExtractor}
        checkIsSelected={checkIsSelected}
        styles={styles?.item}
        onSelect={setSelectedItemId}
        showSelectedIcon={showSelectedIcon}
      />
    ),
    [
      checkIsSelected,
      setSelectedItemId,
      renderItem,
      idExtractor,
      showSelectedIcon,
      styles,
    ]
  )

  return (
    <View style={[selectStyles.listWrapper, styles?.listWrapper]}>
      <FlatList
        data={data}
        renderItem={preRenderItem}
        keyExtractor={idExtractor}
        ItemSeparatorComponent={
          ItemSeparatorComponent === null ? undefined : ListItemSeparator
        }
      />
    </View>
  )
}

export default Select
