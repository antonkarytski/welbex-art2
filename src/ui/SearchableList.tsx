import { useEvent, useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import { defaultColors } from '../features/themed/theme'
import { SearchableListModel } from '../lib/models/model.search'
import SearchInput from './SearchInput'
import { InputStyles } from './input/types'

export type SearchableListStyles = {
  container?: StyleProp<ViewStyle>
  searchInput?: InputStyles
}

type SearchableListProps<T> = {
  children: (
    list: T[],
    SearchComponent?: React.ReactElement<any>
  ) => React.ReactNode
  data: T[]
  model: SearchableListModel<T>
  style?: SearchableListStyles
  showSearchComponent?: boolean
}

function SearchableList<DataItem>({
  children,
  data,
  style,
  model,
  showSearchComponent,
}: SearchableListProps<DataItem>) {
  const { searchStringModel, initialListModel, $filteredList } = model
  const [searchString, setSearchString] = useStateStore(searchStringModel)
  const setInitialDataList = useEvent(initialListModel.set)
  const filteredData = useStore($filteredList)

  useEffect(() => {
    setInitialDataList(data)
  }, [data, setInitialDataList])

  const Input = () => (
    <SearchInput
      value={searchString}
      onChange={setSearchString}
      style={{ ...inputStyles, ...style?.searchInput }}
    />
  )

  return (
    <View style={style?.container}>
      {showSearchComponent && Input()}
      {children(filteredData, showSearchComponent ? undefined : Input())}
    </View>
  )
}

const inputStyles: InputStyles = StyleSheet.create({
  input: {
    borderRadius: 0,
    borderColor: 'transparent',
    borderBottomColor: defaultColors.inputBorder,
    backgroundColor: '#fff',
  },
  input__focused: {
    borderColor: 'transparent',
  },
  container: {
    backgroundColor: defaultColors.screenBackground,
  },
})

export default SearchableList
