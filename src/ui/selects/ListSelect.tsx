import React from 'react'
import { Dimensions } from 'react-native'
import { StateModel } from 'altek-toolkit'
import SearchableSelect from './SearchableSelect'
import Select from './Select'
import { ListSelectProps } from './types'

const { height } = Dimensions.get('window')
const LIST_HEIGHT = height * 0.5

function ListSelect<DataItem>({
  searchModel,
  style,
  model,
  ...props
}: ListSelectProps<DataItem>) {
  const styles = {
    ...style,
    container: [{ height: LIST_HEIGHT }, style?.container],
  }
  return searchModel ? (
    <SearchableSelect
      model={model}
      searchModel={searchModel}
      style={styles}
      {...props}
    />
  ) : (
    <Select model={model as StateModel<DataItem>} style={styles} {...props} />
  )
}

export default ListSelect
