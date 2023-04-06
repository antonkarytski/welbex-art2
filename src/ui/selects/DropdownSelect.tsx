import React, { useRef, useState } from 'react'
import { LayoutChangeEvent, StyleSheet } from 'react-native'
import { StateModel, useStateStore } from 'altek-toolkit'
import DropdownTab from '../dropdownTab'
import { DropdownTabInstance } from '../dropdownTab/DropdownTab'
import SearchableSelect from './SearchableSelect'
import Select from './Select'
import { DropdownSelectProps } from './types'

function DropdownSelect<Item>({
  searchModel,
  placeholder = '',
  label,
  labelExtractor,
  onOpenDropdown,
  style,
  preset,
  ItemSeparatorComponent,
  model,
  ...props
}: DropdownSelectProps<Item>) {
  const [selectedItem, setSelectedItem] = useStateStore(model)
  const [searchInputHeight, setSearchInputHeight] = useState(0)
  const dropdownTabRef = useRef<DropdownTabInstance>(null)

  setSelectedItem.watch(() => {
    dropdownTabRef.current?.close()
  })

  const onSearchInputLayout = (e: LayoutChangeEvent) => {
    setSearchInputHeight(e.nativeEvent.layout.height + 4)
  }

  const selectStyles = {
    item: itemStyles,
    container: [
      listStyles.container,
      searchModel && { paddingBottom: searchInputHeight },
    ],
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
      ref={dropdownTabRef}
    >
      {searchModel ? (
        <SearchableSelect
          searchModel={searchModel}
          style={{ searchInput: style?.searchInput, ...selectStyles }}
          model={model}
          onSearchInputLayout={onSearchInputLayout}
          {...commonProps}
          {...props}
        />
      ) : (
        <Select
          labelExtractor={labelExtractor}
          style={selectStyles}
          model={model as StateModel<Item>}
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
