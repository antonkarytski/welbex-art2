import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import CategoryDetailsHeader from '../../features/categories/CategoryDetailsHeader'
import CategoryGallery from '../../features/categories/CategoryGallery'
import { links } from '../../navigation/links'
import { ScreensProps } from '../../navigation/types.screenProps'

const CategoryDetailsScreen = ({
  route,
}: NativeStackScreenProps<ScreensProps, links.categoryDetails>) => {
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
