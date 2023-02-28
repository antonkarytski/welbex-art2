import { useStore } from 'effector-react'
import React, { useCallback } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { ArtWork } from '../../api/parts/arts/types'
import { noop } from '../../lib/helpers'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import { drawingKeyExtractor } from '../drawing/helpers'
import { useThemedStyleList } from '../themed/hooks'
import { localeAgeTextShort } from '../user/UserDescription'
import GalleryItem from './GalleryItem'
import { useGallery } from './hooks'
import { galleryRequest } from './request'
import { galleryItemThemedStyles } from './styles'
import { GalleryType } from './types'

type GalleryListProps = {
  type: GalleryType
}

const GalleryList = ({ type }: GalleryListProps) => {
  const drawings = useGallery(type)
  const navigate = useNavigate()
  const { styles } = useThemedStyleList({
    item: galleryItemThemedStyles,
  })
  const text = useText()

  const renderItem = useCallback(
    ({ item }: { item: ArtWork }) => {
      return (
        <GalleryItem
          onPress={(drawing) =>
            navigate(links.galleryDrawingDetails, { item: drawing })
          }
          ageTextGenerator={localeAgeTextShort(text)}
          style={styles.item}
          item={item}
        />
      )
    },
    [styles, navigate, text]
  )

  const getNextPage = () => galleryRequest.getNext()

  return (
    <FlatList
      data={drawings}
      contentContainerStyle={componentStyles.contentContainer}
      renderItem={renderItem}
      keyExtractor={drawingKeyExtractor}
      onEndReached={getNextPage}
      showsVerticalScrollIndicator={false}
    />
  )
}

const componentStyles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },
})

export default GalleryList
