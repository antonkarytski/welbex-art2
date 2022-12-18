import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'
import CategoryDetailsHeader from '../../features/categories/CategoryDetailsHeader'
import { links } from '../../navigation/links'
import { ScreensProps } from '../../navigation/types.screenProps'

const CategoryDetailsScreen = ({
  route,
}: NativeStackScreenProps<ScreensProps, links.categoryDetails>) => {
  const category = route.params.item

  return (
    <View>
      <CategoryDetailsHeader item={category} />
    </View>
  )
}

export default CategoryDetailsScreen
