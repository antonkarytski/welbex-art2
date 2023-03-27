import React from 'react'
import { StateModel } from 'altek-toolkit'
import SearchableList from '../SearchableList'
import MultiSelect from './MultiSelect'
import { SearchableMultiSelectProps } from './types'

const SearchableMultiSelect = <DataItem,>({
  searchModel,
  data,
  style,
  preset,
  model,
  ...props
}: SearchableMultiSelectProps<DataItem>) => {
  return (
    <SearchableList model={searchModel} data={data} style={style}>
      {(filteredData) => (
        <MultiSelect
          data={filteredData}
          style={style}
          preset={preset}
          model={model as StateModel<DataItem[]>}
          {...props}
        />
      )}
    </SearchableList>
  )
}

export default SearchableMultiSelect
