import React, { useCallback } from 'react'
import { FlatList, ListRenderItem, View } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import ListItemSeparator from './ListItemSeparator'
import SelectItem from './SelectItem'
import { selectStyles } from './styles'
import { SelectProps } from './types'

const Select = <Item,>({
  data,
  idExtractor,
  renderItem,
  model,
  styles,
  ItemSeparatorComponent,
  showSelectedIcon,
}: SelectProps<Item>) => {
  const [selectedItem, setSelectedItem] = useStateStore(model)

  const selectedId = idExtractor(selectedItem)
  const renderSelect: ListRenderItem<Item> = useCallback(
    ({ item }) => (
      <SelectItem
        renderItem={renderItem}
        item={item}
        styles={styles?.item}
        onSelect={setSelectedItem}
        isSelected={selectedId === idExtractor(item)}
        showSelectedIcon={showSelectedIcon}
      />
    ),
    [
      renderItem,
      showSelectedIcon,
      styles,
      setSelectedItem,
      idExtractor,
      selectedId,
    ]
  )

  return (
    <View style={[selectStyles.listWrapper, styles?.listWrapper]}>
      <FlatList
        data={data}
        renderItem={renderSelect}
        keyExtractor={idExtractor}
        ItemSeparatorComponent={
          ItemSeparatorComponent === null ? undefined : ListItemSeparator
        }
      />
    </View>
  )
}

export default Select
