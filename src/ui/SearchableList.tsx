import { useEvent, useStore } from 'effector-react'
import React, { useEffect } from 'react'
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import { useStateStore } from 'altek-toolkit'
import { defaultColors } from '../features/themed/theme'
import { SearchableListModel } from '../lib/models/model.search'
import { NodeFn } from '../types'
import SearchInput from './SearchInput'
import { InputStyles } from './input/types'

export type SearchableListStyles = {
  container?: StyleProp<ViewStyle>
  searchInput?: InputStyles
}

type SearchableListProps<T> = {
  children: NodeFn<T[]>
  data: T[]
  model: SearchableListModel<T>
  style?: SearchableListStyles
  onSearchInputLayout?: (e: LayoutChangeEvent) => void
}

function SearchableList<DataItem>({
  children,
  data,
  style,
  model,
  onSearchInputLayout,
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
        onLayout={onSearchInputLayout}
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
