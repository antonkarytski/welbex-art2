import { useEvent, useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { Dimensions, FlatList, ListRenderItem, View } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import CrossButton from '../buttons/Button.Cross'
import SearchIcon from '../icons/Icon.Search'
import Input from '../input'
import ListItem from './ListItem'
import ListItemSeparator from './ListItemSeparator'
import { inputStyles, listStyles } from './styles'
import { SearchableListProps } from './types'

const { height } = Dimensions.get('window')
const LIST_MAX_HEIGHT = height * 0.6

function ListSelect<DataItem extends Record<string, any>>({
  data,
  renderItem,
  idExtractorName,
  ItemSeparatorComponent,
  styleInput,
  styles,
  searchable = true,
  searchModel,
  selectModel,
}: SearchableListProps<DataItem>) {
  const { searchStringModel, initialListModel, $filteredList } = searchModel
  const [searchString, setSearchString] = useStateStore(searchStringModel)
  const setInitialDataList = useEvent(initialListModel.set)
  const filteredData = useStore($filteredList)
  const [selectedItemId, setSelectedItemId] = useStateStore(selectModel)

  useEffect(() => {
    setInitialDataList(data)
  }, [data, setInitialDataList])

  const preRenderItem: ListRenderItem<DataItem> = ({ item }) => (
    <ListItem
      renderItem={renderItem}
      item={item}
      itemId={item[idExtractorName]}
      style={styles?.item}
      selectedItemId={selectedItemId}
      setSelectedItemId={setSelectedItemId}
    />
  )

  return (
    <View>
      {searchable && (
        <Input
          value={searchString}
          onChangeText={setSearchString}
          InputPseudoBefore={<SearchIcon />}
          InputPseudoAfter={<CrossButton onPress={() => setSearchString('')} />}
          styles={{ ...inputStyles, ...styleInput }}
        />
      )}
      <FlatList
        data={filteredData}
        renderItem={preRenderItem}
        keyExtractor={(item) => item[idExtractorName].toString()}
        ItemSeparatorComponent={ItemSeparatorComponent || ListItemSeparator}
        style={[listStyles.list, { height: LIST_MAX_HEIGHT }, styles?.list]}
      />
    </View>
  )
}

export default ListSelect
