import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Text } from 'react-native'
import { links } from '../../navigation/links'
import { ScreensProps } from '../../navigation/types.screenProps'

const CompetitionCategoryDetailsScreen = ({
  route,
}: NativeStackScreenProps<ScreensProps, links.competitionCategoryDetails>) => {
  const category = route.params.item

  return <Text>{category.label}</Text>
}

export default CompetitionCategoryDetailsScreen
