import { useEvent, useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { Dimensions, View } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import CrossButton from '../buttons/Button.Cross'
import SearchIcon from '../icons/Icon.Search'
import Input from '../input'
import Select from './Select'
import { inputStyles } from './styles'
import { ListSelectProps } from './types'

const { height } = Dimensions.get('window')
const LIST_MAX_HEIGHT = height * 0.55

function ListSelect<DataItem extends Record<string, any>>({
  data,
  renderItem,
  ItemSeparatorComponent,
  styles,
  searchable = true,
  searchModel,
  model,
  idExtractor,
}: ListSelectProps<DataItem>) {
  const { searchStringModel, initialListModel, $filteredList } = searchModel
  const [searchString, setSearchString] = useStateStore(searchStringModel)
  const setInitialDataList = useEvent(initialListModel.set)
  const filteredData = useStore($filteredList)

  useEffect(() => {
    setInitialDataList(data)
  }, [data, setInitialDataList])

  return (
    <View style={styles?.wrapper}>
      {searchable && (
        <Input
          value={searchString}
          onChangeText={setSearchString}
          InputPseudoBefore={<SearchIcon />}
          InputPseudoAfter={<CrossButton onPress={() => setSearchString('')} />}
          styles={{ ...inputStyles, ...styles?.inputStyles }}
        />
      )}
      <Select
        data={filteredData}
        idExtractor={idExtractor}
        renderItem={renderItem}
        model={model}
        styles={{ ...styles, listWrapper: { height: LIST_MAX_HEIGHT } }}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  )
}

export default ListSelect
