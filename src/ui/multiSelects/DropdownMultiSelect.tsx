import React from 'react'
import { StyleSheet } from 'react-native'
import { StateModel, useStateStore } from 'altek-toolkit'
import { WINDOW_HEIGHT } from '../../lib/device/dimensions'
import DropdownTab from '../dropdownTab'
import MultiSelect from './MultiSelect'
import SearchableMultiSelect from './SearchableMultiSelect'
import { DropdownMultiSelectProps } from './types'

function DropdownMultiSelect<Item>({
  searchModel,
  tabLabel,
  label,
  labelExtractor,
  onOpenDropdown,
  style,
  preset,
  ItemSeparatorComponent,
  model,
  selectedCounterLabel,
  ...props
}: DropdownMultiSelectProps<Item>) {
  const [selectedItems] = useStateStore(model)

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

  const dropdownTabStyle = {
    dropdownContainer: { height: WINDOW_HEIGHT * 0.35 },
    ...style?.dropdownTab,
  }

  return (
    <DropdownTab
      label={label}
      tabLabel={
        selectedCounterLabel
          ? `${selectedCounterLabel}: ${selectedItems?.length}`
          : tabLabel
      }
      style={dropdownTabStyle}
      preset={preset?.dropdownTab}
      onOpenDropdown={onOpenDropdown}
    >
      {searchModel ? (
        <SearchableMultiSelect
          searchModel={searchModel}
          style={{ searchInput: style?.searchInput, ...selectStyles }}
          model={model}
          {...commonProps}
          {...props}
        />
      ) : (
        <MultiSelect
          labelExtractor={labelExtractor}
          style={selectStyles}
          model={model as StateModel<Item[]>}
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

export default DropdownMultiSelect
