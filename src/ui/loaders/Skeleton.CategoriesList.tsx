import { Skeleton } from 'native-base'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SCREEN_PADDING_HORIZONTAL } from '../../styles/constants'
import { defaultSkeletonColors } from './colors'
import { ColorsProp } from './types'

const CategoryCard = ({ colors }: ColorsProp) => {
  return (
    <View style={styles.card}>
      <Skeleton {...colors} borderTopRadius="20" height={180} />
      <View style={styles.cardCaption}>
        <Skeleton.Text {...colors} width={'170'} lines={1} />
      </View>
    </View>
  )
}

const CategoriesListSkeleton = ({
  colors = defaultSkeletonColors,
}: ColorsProp) => {
  return (
    <View style={styles.container}>
      <Skeleton rounded="xl" {...colors} style={[styles.item, styles.title]} />
      <CategoryCard colors={colors} />
      <CategoryCard colors={colors} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
  },
  item: {
    marginBottom: 20,
  },
  title: {
    width: 170,
    height: 40,
    marginVertical: 20,
    marginRight: 'auto',
  },
  card: {
    width: '100%',
    borderColor: '#D5DDDC',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 20,
  },
  cardCaption: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
})

export default CategoriesListSkeleton
