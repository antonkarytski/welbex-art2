import { useEvent, useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import { defaultColors } from '../../features/themed/theme'
import { SearchableListModel } from '../../lib/models/model.search'
import { NodeFn } from '../../types'
import { InputStyles } from '../input/types'
import SearchInput from './SearchInput'

export type SearchableListStyles = {
  container?: StyleProp<ViewStyle>
  searchInput?: InputStyles
}

type SearchableListProps<T> = {
  children: NodeFn<T[]>
  data: T[]
  model: SearchableListModel<T>
  style?: SearchableListStyles
}

function SearchableList<DataItem extends Record<string, any>>({
  children,
  data,
  style,
  model,
}: SearchableListProps<DataItem>) {
  const { searchStringModel, initialListModel, $filteredList } = model
  const [searchString, setSearchString] = useStateStore(searchStringModel)
  const setInitialDataList = useEvent(initialListModel.set)
  const filteredData = useStore($filteredList)

  useEffect(() => {
    setInitialDataList(data)
  }, [data, setInitialDataList])

  return (
    <View style={style?.container}>
      <SearchInput
        value={searchString}
        onChange={setSearchString}
        style={{ ...inputStyles, ...style?.searchInput }}
      />
      {children(filteredData)}
    </View>
  )
}

const inputStyles: InputStyles = StyleSheet.create({
  wrapper: {
    marginBottom: 4,
  },
  input: {
    borderRadius: 0,
    borderColor: 'transparent',
    borderBottomColor: defaultColors.inputBorder,
    backgroundColor: '#fff',
  },
  input__focused: {
    borderColor: 'transparent',
  },
})

export default SearchableList
