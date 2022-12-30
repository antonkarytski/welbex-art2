import React from 'react'
import { StyleSheet } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import DropdownTab from '../dropdownTab'
import Select from './Select'
import { DropdownSelectProps } from './types'

function DropdownSelect<Item>({
  label,
  placeholder = 'Выберите значение из списка',
  data,
  idExtractor,
  labelExtractor,
  renderItem,
  model,
  styles,
  ItemSeparatorComponent = null,
}: DropdownSelectProps<Item>) {
  const [selectedItem] = useStateStore(model)

  return (
    <DropdownTab
      label={label}
      tabLabel={labelExtractor?.(selectedItem) ?? placeholder}
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
        ItemSeparatorComponent={ItemSeparatorComponent}
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
