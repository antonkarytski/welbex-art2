import React, { useCallback } from 'react'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import { defaultColors } from '../../features/themed/theme'
import Row from '../Row'
import TextButton from '../buttons/Button.Text'
import ListItemSeparator from '../lists/ListItemSeparator'
import SelectItem from '../selects/selectItem/SelectItem'
import { selectStyles } from '../selects/styles'
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
        data={data}
        ListHeaderComponent={
          showSelectAllButtons ? (
            <Row style={styles.row}>
              <TextButton
                label={selectAllLabel}
                onPress={onSelectAll}
                style={{
                  button: [styles.button, styles.leftButton],
                  label: styles.buttonLabel,
                }}
              />
              <TextButton
                label={removeAllLabel}
                onPress={onRemoveAll}
                style={{
                  button: [styles.button],
                  label: styles.buttonLabel,
                }}
              />
            </Row>
          ) : null
        }
        stickyHeaderIndices={[0]}
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

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    backgroundColor: defaultColors.screenBackground,
  },
  button: {
    paddingVertical: 12,
  },
  leftButton: {
    marginRight: 40,
  },
  buttonLabel: {
    color: defaultColors.textGrey,
  },
})

export default MultiSelect
