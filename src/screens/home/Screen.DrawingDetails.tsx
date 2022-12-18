import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import CategoryDetailsHeader from '../../features/categories/CategoryDetailsHeader'
import CategoryGallery from '../../features/categories/CategoryGallery'
import { links } from '../../navigation/links'
import { ScreensProps } from '../../navigation/types.screenProps'

const DrawingDetailsScreen = ({
  route,
}: NativeStackScreenProps<ScreensProps, links.drawingDetails>) => {
  const category = route.params.item

  return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
  container: { flex: 1 },
})

export default DrawingDetailsScreen
