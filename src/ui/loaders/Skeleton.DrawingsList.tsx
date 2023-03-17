import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SCREEN_PADDING_HORIZONTAL } from '../../styles/constants'
import DrawingsRowSkeleton from './Skeleton.DrawingRow'
import { defaultSkeletonColors } from './colors'
import { ColorsProp } from './types'

const DrawingsListSkeleton = ({
  colors = defaultSkeletonColors,
}: ColorsProp) => {
  return (
    <View style={styles.container}>
      <DrawingsRowSkeleton colors={colors} style={styles.item} />
      <DrawingsRowSkeleton colors={colors} style={styles.item} />
      <DrawingsRowSkeleton colors={colors} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
    height: '100%',
  },
  item: {
    marginBottom: 20,
  },
})

export default DrawingsListSkeleton
