import React, { useCallback } from 'react'
import { FlatList, ListRenderItem, View } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import ListItemSeparator from '../lists/ListItemSeparator'
import SelectItem from '../selects/selectItem/SelectItem'
import { selectStyles } from '../selects/styles'
import SelectControllersButtons from './SelectControllersButtons'
import { MultiSelectProps } from './types'

const MultiSelect = <Item,>({
  data,
  idExtractor,
  renderItem,
  model,
  style,
  ItemSeparatorComponent,
  showSelectedIcon,
  ListFooterComponent,
  ListHeaderComponent,
  labelExtractor,
  preset,
  onEndReached,
  selectAllLabel = 'Select all',
  removeAllLabel = 'Remove all',
  showSelectAllButtons = false,
}: MultiSelectProps<Item>) => {
  const [selectedItems, setSelectedItems] = useStateStore(model)

  const selectedIds = selectedItems.map((item) => idExtractor(item))

  const addSelectedItem = useCallback(
    (item: Item) => {
      const newArray = selectedIds.includes(idExtractor(item))
        ? selectedItems.filter((i) => idExtractor(i) !== idExtractor(item))
        : [...selectedItems, item]

      setSelectedItems(newArray)
    },
    [selectedItems, selectedIds, idExtractor, setSelectedItems]
  )

  const onSelectAll = () => {
    setSelectedItems(data)
  }

  const onRemoveAll = () => {
    setSelectedItems([])
  }

  const renderSelectItem: ListRenderItem<Item> = useCallback(
    ({ item }) => (
      <SelectItem
        renderItem={renderItem}
        item={item}
        style={style?.item}
        onSelect={addSelectedItem}
        isSelected={selectedIds.includes(idExtractor(item))}
        showSelectedIcon={showSelectedIcon}
        labelExtractor={labelExtractor}
        preset={preset}
      />
    ),
    [
      renderItem,
      showSelectedIcon,
      style,
      addSelectedItem,
      idExtractor,
      selectedIds,
      labelExtractor,
      preset,
    ]
  )

  return (
    <View style={[selectStyles.container, style?.container]}>
      <FlatList
        bounces={false}
        data={data}
        ListHeaderComponent={
          <>
            {ListHeaderComponent}
            {showSelectAllButtons && (
              <SelectControllersButtons
                selectAllLabel={selectAllLabel}
                onSelectAll={onSelectAll}
                onRemoveAll={onRemoveAll}
                removeAllLabel={removeAllLabel}
              />
            )}
          </>
        }
        stickyHeaderIndices={
          ListHeaderComponent || showSelectAllButtons ? [0] : undefined
        }
        renderItem={renderSelectItem}
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

export default MultiSelect
