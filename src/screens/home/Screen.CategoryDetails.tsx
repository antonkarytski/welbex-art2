import React from 'react'
import { StyleSheet, View } from 'react-native'
import CategoryDetailsHeader from '../../features/categories/CategoryDetailsHeader'
import CategoryGallery from '../../features/categories/CategoryGallery'
import { links } from '../../navigation/links'
import { ScreenComponentProps } from '../../navigation/types.screenProps'

const CategoryDetailsScreen = ({
  route,
}: ScreenComponentProps<links.categoryDetails>) => {
  const category = route.params.item

  //Rework scroll
  return (
    <View style={styles.container}>
      <CategoryDetailsHeader item={category} />
      <CategoryGallery item={category} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
})

export default CategoryDetailsScreen
