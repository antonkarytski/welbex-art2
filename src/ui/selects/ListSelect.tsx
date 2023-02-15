import React from 'react'
import { Dimensions } from 'react-native'
import SearchableSelect from './SearchableSelect'
import Select from './Select'
import { ListSelectProps } from './types'

const { height } = Dimensions.get('window')
const LIST_HEIGHT = height * 0.5

function ListSelect<DataItem extends Record<string, any>>({
  searchModel,
  style,
  ...props
}: ListSelectProps<DataItem>) {
  const styles = {
    ...style,
    container: [{ height: LIST_HEIGHT }, style?.container],
  }
  return searchModel ? (
    <SearchableSelect searchModel={searchModel} style={styles} {...props} />
  ) : (
    <Select style={styles} {...props} />
  )
}

export default ListSelect
