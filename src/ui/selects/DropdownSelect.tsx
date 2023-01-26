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
  style,
  labelWeight,
  ItemSeparatorComponent = null,
}: DropdownSelectProps<Item>) {
  const [selectedItem] = useStateStore(model)

  return (
    <DropdownTab
      label={label}
      labelWeight={labelWeight}
      tabLabel={labelExtractor?.(selectedItem) ?? placeholder}
      style={style?.dropdownTab}
    >
      <Select
        data={data}
        idExtractor={idExtractor}
        renderItem={renderItem}
        model={model}
        style={{
          item: itemStyles,
          listWrapper: listStyles.wrapper,
          ...style?.select,
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
