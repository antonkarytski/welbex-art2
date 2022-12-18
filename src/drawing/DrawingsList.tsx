import React, { ReactElement, useCallback } from 'react'
import {
  Dimensions,
  FlatList,
  ImageStyle,
  StyleSheet,
  View,
} from 'react-native'
import { createThemedStyle } from '../features/themed'
import { useThemedStyle } from '../features/themed/hooks'
import { themedShadow5Style } from '../styles/shadows'
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
  const styles = useThemedStyle(themedStyles)

  const renderItem = useCallback(
    ({ item }: { item: Drawing }) => {
      return (
        <DrawingItem
          containerStyle={styles.itemContainer}
          style={styles.item as ImageStyle}
          size={imageSize}
          image={item.image}
        />
      )
    },
    [imageSize, styles]
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

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
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
    itemContainer: themedShadow5Style(colors),
    listContentContainer: {
      paddingHorizontal: PADDING_SIZE,
    },
  })
)

export default DrawingsList
