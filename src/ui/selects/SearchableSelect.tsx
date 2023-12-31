import React from 'react'
import { StateModel } from 'altek-toolkit'
import SearchableList from '../SearchableList'
import Select from './Select'
import { SearchableSelectProps } from './types'

const SearchableSelect = <DataItem,>({
  searchModel,
  data,
  style,
  preset,
  model,
  ...props
}: SearchableSelectProps<DataItem>) => {
  return (
    <SearchableList model={searchModel} data={data} style={style}>
      {(filteredData, SearchInput) => (
        <Select
          data={filteredData}
          style={style}
          preset={preset}
          model={model as StateModel<DataItem>}
          ListHeaderComponent={SearchInput}
          stickyHeaderIndices={SearchInput ? [0] : undefined}
          {...props}
        />
      )}
    </SearchableList>
  )
}

export default SearchableSelect
