import { Skeleton } from 'native-base'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { getWidth } from '../../lib/device/dimensions'
import { SCREEN_PADDING_HORIZONTAL } from '../../styles/constants'
import { defaultSkeletonColors } from './colors'
import { ColorsProp } from './types'

const WinnerCard = ({ colors }: ColorsProp) => {
  return (
    <View style={styles.card}>
      <Skeleton {...colors} borderTopRadius="20" height={150} />
      <View style={styles.cardCaption}>
        <Skeleton.Text {...colors} width={'170'} lines={1} marginBottom={3} />
        <Skeleton.Text {...colors} width={'170'} lines={1} />
      </View>
    </View>
  )
}

const WinnersListSkeleton = ({
  colors = defaultSkeletonColors,
}: ColorsProp) => {
  return (
    <View style={styles.container}>
      <Skeleton rounded="xl" {...colors} style={[styles.item, styles.title]} />
      <View style={styles.list}>
        <WinnerCard colors={colors} />
        <WinnerCard colors={colors} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    width: getWidth({ percentOfScreenSize: 70 }),
    borderColor: '#D5DDDC',
    borderWidth: 1,
    marginRight: 20,
    borderRadius: 20,
  },
  cardCaption: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
})

export default WinnersListSkeleton
