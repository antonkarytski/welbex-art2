import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CategoriesList from '../../features/categories/CategoriesList'
import WinnersBlock from '../../features/winners/WinnersBlock'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <WinnersBlock />
      <CategoriesList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
