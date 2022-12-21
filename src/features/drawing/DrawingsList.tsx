import React, { ReactElement, useCallback } from 'react'
import {
  Dimensions,
  FlatList,
  ImageStyle,
  StyleSheet,
  View,
} from 'react-native'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { themedShadow5Style } from '../../styles/shadows'
import { createThemedStyle } from '../themed'
import { useThemedStyle } from '../themed/hooks'
import DrawingItem from './DrawingItem'
import { drawingKeyExtractor } from './helpers'
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

const DrawingsList = ({ data, ListHeader }: DrawingsListProps) => {
  const imageSize = getImageSize()
  const styles = useThemedStyle(themedStyles)
  const navigate = useNavigate()

  const goToDrawingDetails = useCallback(
    (item: Drawing) => navigate(links.drawingDetails, { item }),
    [navigate]
  )

  const renderItem = useCallback(
    ({ item }: { item: Drawing }) => {
      return (
        <DrawingItem
          containerStyle={styles.itemContainer}
          style={styles.item as ImageStyle}
          size={imageSize}
          item={item}
          onPress={goToDrawingDetails}
        />
      )
    },
    [imageSize, styles, goToDrawingDetails]
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
        keyExtractor={drawingKeyExtractor}
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
