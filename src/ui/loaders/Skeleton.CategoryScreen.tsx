import { Skeleton } from 'native-base'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { getHeight } from '../../lib/device/dimensions'
import { SCREEN_PADDING_HORIZONTAL } from '../../styles/constants'
import DrawingsRowSkeleton from './Skeleton.DrawingRow'
import { defaultSkeletonColors } from './colors'
import { ColorsProp } from './types'

const CategoryScreenSkeleton = ({
  colors = defaultSkeletonColors,
}: ColorsProp) => {
  return (
    <View style={styles.container}>
      <Skeleton {...colors} style={[styles.item, styles.header]} />

      <View style={styles.innerContainer}>
        <Skeleton
          rounded="xl"
          {...colors}
          style={[styles.item, styles.title]}
        />
        <Skeleton.Text {...colors} style={styles.item} />
        <Skeleton
          rounded="full"
          {...colors}
          style={[styles.item, styles.button]}
        />
        <DrawingsRowSkeleton colors={colors} style={styles.item} />
        <DrawingsRowSkeleton colors={colors} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: -1,
    width: '100%',
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
  },
  item: {
    marginBottom: 20,
  },
  header: {
    height: getHeight({ percentOfScreenSize: 30 }),
  },
  title: {
    width: 150,
    marginRight: 'auto',
  },
  button: {
    height: 50,
  },
})

export default CategoryScreenSkeleton
