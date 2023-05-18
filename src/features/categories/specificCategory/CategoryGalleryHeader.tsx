import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SpecificCategoryResponse } from '../../../api/parts/categories/types'
import { useText } from '../../../translations/hook'
import H2 from '../../../ui/H2'
import { createThemedStyle } from '../../themed'
import { useThemedStyle } from '../../themed/hooks'
import JoinCategoryButton from './JoinCategoryButton'

type CategoryGalleryProps = {
  item: SpecificCategoryResponse
  header?: React.ReactNode
}

const CategoryGalleryHeader = ({ header, item }: CategoryGalleryProps) => {
  const text = useText()
  const styles = useThemedStyle(themedStyles)

  return (
    <>
      {header}
      <View style={styles.container}>
        <JoinCategoryButton item={item} />
        <H2 label={text.participantsDrawings} style={styles.title} />
      </View>
    </>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    title: {
      color: colors.text,
      marginTop: 32,
    },
    container: {
      marginTop: 24,
    },
  })
)

export default CategoryGalleryHeader
