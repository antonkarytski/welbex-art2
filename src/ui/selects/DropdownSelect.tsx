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
  ...props
}: DropdownSelectProps<Item>) {
  const [selectedItem] = useStateStore(props.model)

  return (
    <DropdownTab
      label={label}
      tabLabel={labelExtractor?.(selectedItem) ?? placeholder}
      style={style?.dropdownTab}
      onOpenDropdown={onOpenDropdown}
    >
      {searchModel ? (
        <SearchableSelect
          searchModel={searchModel}
          style={{ searchInput: style?.searchInput }}
          {...props}
        />
      ) : (
        <Select
          showSelectedIcon={false}
          labelExtractor={labelExtractor}
          style={{
            item: itemStyles,
            container: listStyles.container,
            ...style?.select,
          }}
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
