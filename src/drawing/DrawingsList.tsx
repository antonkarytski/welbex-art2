import React, { ReactElement, useCallback } from 'react'
import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import DrawingItem from './DrawingItem'
import { Drawing } from './types'

type DrawingsListProps = {
  data: Drawing[]
  ListHeader: ReactElement
}

const PADDING_SIZE = 20
function getImageSize() {
  const screenWidth = Dimensions.get('screen').width
  return (screenWidth - PADDING_SIZE * 3) / 2
}
const keyExtractor = ({ id }: Drawing) => id

const DrawingsList = ({ data, ListHeader }: DrawingsListProps) => {
  const imageSize = getImageSize()

  const renderItem = useCallback(
    ({ item }: { item: Drawing }) => {
      return (
        <DrawingItem style={styles.item} size={imageSize} image={item.image} />
      )
    },
    [imageSize]
  )

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={ListHeader}
        data={data}
        contentContainerStyle={styles.listContentContainer}
        columnWrapperStyle={styles.listColumnWrapper}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listColumnWrapper: {
    justifyContent: 'space-between',
  },
  item: {
    marginBottom: 20,
    borderRadius: 20,
  },
  listContentContainer: {
    paddingHorizontal: PADDING_SIZE,
  },
})

export default DrawingsList
