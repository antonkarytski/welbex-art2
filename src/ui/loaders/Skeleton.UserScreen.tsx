import { HStack, Skeleton } from 'native-base'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
  SCREEN_CONTENT_WIDTH,
  SCREEN_PADDING_HORIZONTAL,
} from '../../styles/constants'
import DrawingsRowSkeleton from './Skeleton.DrawingRow'
import { defaultSkeletonColors } from './colors'
import { ColorsProp } from './types'

const UserScreenSkeleton = ({ colors = defaultSkeletonColors }: ColorsProp) => {
  const countersBlockProps = {
    rounded: 'xl',
    style: styles.counterBlock,
    ...colors,
  }
  const tabBlockProps = {
    rounded: 'full',
    style: styles.tabBlock,
    ...colors,
  }

  return (
    <>
      <Skeleton {...colors} style={styles.header} />
      <View style={styles.innerContainer}>
        <Skeleton
          borderWidth={1}
          borderColor="coolGray.300"
          startColor="gray.200"
          endColor="gray.50"
          rounded="full"
          style={[styles.item, styles.avatar]}
        />
        <Skeleton.Text
          lines={2}
          {...colors}
          style={[styles.item, styles.userInfoText]}
          alignItems={'center'}
        />
        <HStack style={styles.countersContainer}>
          <Skeleton {...countersBlockProps} />
          <Skeleton {...countersBlockProps} />
          <Skeleton {...countersBlockProps} />
        </HStack>
        <HStack style={styles.tabsContainer}>
          <Skeleton {...tabBlockProps} />
          <Skeleton {...tabBlockProps} />
          <Skeleton {...tabBlockProps} />
        </HStack>
        <Skeleton {...colors} style={[styles.item, styles.tabsLine]} />
        <DrawingsRowSkeleton colors={colors} style={styles.item} />
        <DrawingsRowSkeleton colors={colors} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
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
    height: 190,
  },
  avatar: {
    width: 112,
    height: 112,
    marginTop: -(112 / 2),
  },
  userInfoText: {
    width: 180,
    justifyContent: 'center',
  },
  counterBlock: {
    width: '30%',
    height: 60,
  },
  countersContainer: {
    justifyContent: 'space-between',
    width: SCREEN_CONTENT_WIDTH,
    marginBottom: 32,
  },
  tabBlock: {
    height: 20,
    width: '30%',
  },
  tabsContainer: {
    justifyContent: 'space-between',
    width: SCREEN_CONTENT_WIDTH,
    marginBottom: 8,
  },
  tabsLine: {
    height: 2,
  },
})

export default UserScreenSkeleton
