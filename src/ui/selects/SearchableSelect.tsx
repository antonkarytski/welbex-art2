import React from 'react'
import SearchableList from '../searchableList/SearchableList'
import Select from './Select'
import { SearchableSelectProps } from './types'

const SearchableSelect = <DataItem extends Record<string, any>>({
  searchModel,
  data,
  style,
  preset,
  ...props
}: SearchableSelectProps<DataItem>) => {
  return (
    <SearchableList model={searchModel} data={data} style={style}>
      {(filteredData) => (
        <Select data={filteredData} style={style} preset={preset} {...props} />
      )}
    </SearchableList>
  )
}

export default SearchableSelect
