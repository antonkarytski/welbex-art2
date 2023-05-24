import React from 'react'
import { StateModel } from 'altek-toolkit'
import SearchableSelect from './SearchableSelect'
import Select from './Select'
import { ListSelectProps } from './types'

function ListSelect<DataItem>({
  searchModel,
  style,
  model,
  ...props
}: ListSelectProps<DataItem>) {
  return searchModel ? (
    <SearchableSelect
      model={model}
      searchModel={searchModel}
      style={style}
      {...props}
    />
  ) : (
    <Select
      model={model as StateModel<DataItem>}
      style={style}
      {...props}
    />
  )
}

export default ListSelect
