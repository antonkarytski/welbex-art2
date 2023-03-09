import React from 'react'
import { StyleSheet } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import DropdownTab from '../dropdownTab'
import SearchableSelect from './SearchableSelect'
import Select from './Select'
import { DropdownSelectProps } from './types'

function DropdownSelect<Item extends Record<string, any>>({
  searchModel,
  placeholder = 'Выберите значение из списка',
  label,
  labelExtractor,
  onOpenDropdown,
  style,
  preset,
  ItemSeparatorComponent,
  ...props
}: DropdownSelectProps<Item>) {
  const [selectedItem] = useStateStore(props.model)

  const selectStyles = {
    item: itemStyles,
    container: listStyles.container,
    ...style?.select,
  }

  const commonProps = {
    showSelectedIcon: false,
    preset: preset?.selectItem,
    ItemSeparatorComponent: ItemSeparatorComponent || null,
  }

  return (
    <DropdownTab
      label={label}
      tabLabel={(selectedItem && labelExtractor?.(selectedItem)) ?? placeholder}
      style={style?.dropdownTab}
      preset={preset?.dropdownTab}
      onOpenDropdown={onOpenDropdown}
    >
      {searchModel ? (
        <SearchableSelect
          searchModel={searchModel}
          style={{ searchInput: style?.searchInput, ...selectStyles }}
          {...commonProps}
          {...props}
        />
      ) : (
        <Select
          labelExtractor={labelExtractor}
          style={selectStyles}
          {...commonProps}
          {...props}
        />
      )}
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
  container: {
    paddingHorizontal: 0,
  },
})

export default DropdownSelect
