import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useThemedStyleList } from '../themed/hooks'
import GalleryItem from './GalleryItem'
import { useGallery } from './hooks'
import { galleryItemThemedStyles } from './styles'
import { GalleryType } from './types'

type GalleryListProps = {
  type: GalleryType
}

const GalleryList = ({ type }: GalleryListProps) => {
  const drawings = useGallery(type)
  const { styles } = useThemedStyleList({
    item: galleryItemThemedStyles,
  })

  return (
    <FlatList
      data={drawings}
      contentContainerStyle={componentStyles.contentContainer}
      renderItem={({ item }) => {
        return <GalleryItem style={styles.item} item={item} />
      }}
    />
  )
}

const componentStyles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
  },
})

export default GalleryList
