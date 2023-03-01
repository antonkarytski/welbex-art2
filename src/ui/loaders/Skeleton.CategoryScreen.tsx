import { HStack, Skeleton } from 'native-base'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SCREEN_WIDTH, getHeight } from '../../lib/device/dimensions'
import {
  SCREEN_CONTENT_WIDTH,
  SCREEN_PADDING_HORIZONTAL,
} from '../../styles/constants'

type CategorySkeletonProps = {
  colors?: {
    startColor: string
    endColor: string
  }
}

const defaultColors = {
  startColor: 'gray.200',
  endColor: 'gray.100',
}

const DrawingsRowSkeleton = ({ colors }: CategorySkeletonProps) => {
  const drawingWidth = (SCREEN_WIDTH - SCREEN_PADDING_HORIZONTAL * 3) / 2
  const drawingProps = {
    style: {
      width: drawingWidth,
      height: drawingWidth,
    },
    rounded: 'xl',
    ...colors,
  }

  return (
    <HStack
      width={SCREEN_CONTENT_WIDTH}
      justifyContent={'space-between'}
      style={styles.item}
    >
      <Skeleton {...drawingProps} />
      <Skeleton {...drawingProps} />
    </HStack>
  )
}

const CategoryScreenSkeleton = ({
  colors = defaultColors,
}: CategorySkeletonProps) => {
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
        <DrawingsRowSkeleton colors={colors} />
        <DrawingsRowSkeleton colors={colors} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: -1,
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
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
