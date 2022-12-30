import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import DropdownTab from '../dropdownTab'
import Select from './Select'
import { DropdownSelectProps } from './types'

function DropdownSelect<DataItem extends Record<string, any>>({
  label,
  placeholder = 'Выберите значение из списка',
  data,
  idExtractor,
  labelExtractor,
  renderItem,
  model,
  styles,
  ItemSeparatorComponent,
  selectedItemId,
}: DropdownSelectProps<DataItem>) {
  const selectedItemName = useMemo(() => {
    const selectedItem = data.find((item) => {
      const itemId = idExtractor ? idExtractor(item) : item.id
      return String(selectedItemId) === String(itemId)
    })
    return selectedItem && labelExtractor(selectedItem)
  }, [data, selectedItemId, idExtractor, labelExtractor])

  return (
    <DropdownTab
      label={label}
      tabLabel={selectedItemName ?? placeholder}
      styles={styles?.dropdownTab}
    >
      <Select
        data={data}
        idExtractor={idExtractor}
        renderItem={renderItem}
        model={model}
        styles={{
          ...styles,
          item: itemStyles,
          listWrapper: listStyles.wrapper,
        }}
        ItemSeparatorComponent={ItemSeparatorComponent || null}
        showSelectedIcon={false}
      />
    </DropdownTab>
  )
}

const itemStyles = StyleSheet.create({
  item__selected: {
    backgroundColor: '#F9FAF9',
  },
  wrapper: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
})

const listStyles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0,
  },
})

export default DropdownSelect
