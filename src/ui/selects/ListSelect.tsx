import { useEvent, useStore } from 'effector-react'
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import CrossButton from '../buttons/Button.Cross'
import SearchIcon from '../icons/Icon.Search'
import Input from '../input'
import { InputStyles } from '../input/types'
import Select from './Select'
import { ListSelectProps } from './types'

const { height } = Dimensions.get('window')
const LIST_MAX_HEIGHT = height * 0.5

function ListSelect<DataItem extends Record<string, any>>({
  data,
  renderItem,
  ItemSeparatorComponent,
  style,
  searchable = true,
  searchModel,
  model,
  idExtractor,
}: ListSelectProps<DataItem>) {
  const [containerHeight, setContainerHeight] = useState(LIST_MAX_HEIGHT)
  const { searchStringModel, initialListModel, $filteredList } = searchModel
  const [searchString, setSearchString] = useStateStore(searchStringModel)
  const setInitialDataList = useEvent(initialListModel.set)
  const filteredData = useStore($filteredList)

  useEffect(() => {
    setInitialDataList(data)
  }, [data, setInitialDataList])

  return (
    <View
      style={[{ height: containerHeight }, style?.wrapper]}
      onLayout={({ nativeEvent }) => {
        setContainerHeight(nativeEvent.layout.height)
      }}
    >
      {searchable && (
        <Input
          value={searchString}
          onChangeText={setSearchString}
          InputPseudoBefore={<SearchIcon />}
          InputPseudoAfter={<CrossButton onPress={() => setSearchString('')} />}
          styles={{ ...inputStyles, ...style?.inputStyles }}
        />
      )}
      <Select
        data={filteredData}
        idExtractor={idExtractor}
        renderItem={renderItem}
        model={model}
        style={{
          ...style,
        }}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  )
}

const inputStyles: InputStyles = StyleSheet.create({
  wrapper: {
    marginBottom: 4,
  },
})

export default ListSelect
