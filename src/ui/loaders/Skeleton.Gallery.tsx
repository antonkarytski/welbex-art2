import { Skeleton } from 'native-base'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SCREEN_PADDING_HORIZONTAL } from '../../styles/constants'
import Row from '../Row'
import HeartIcon from '../icons/Icon.Heart'
import ShareIcon from '../icons/Icon.Share'
import { defaultSkeletonColors } from './colors'
import { ColorsProp } from './types'

const ArtCard = ({ colors }: ColorsProp) => {
  return (
    <View style={styles.card}>
      <Skeleton {...colors} borderTopRadius="20" height={240} />
      <Row style={styles.interactiveRow}>
        <View style={styles.cardCaption}>
          <Skeleton.Text
            {...colors}
            width={'170'}
            lines={1}
            marginBottom={1.5}
          />
          <Skeleton.Text {...colors} width={'170'} lines={1} />
        </View>
        <Row style={styles.iconsContainer}>
          <HeartIcon style={styles.heartIcon} color={'lightgray'} />
          <ShareIcon color={'lightgray'} />
        </Row>
      </Row>
    </View>
  )
}

const GallerySkeleton = ({ colors = defaultSkeletonColors }: ColorsProp) => {
  return (
    <View style={styles.container}>
      <ArtCard colors={colors} />
      <ArtCard colors={colors} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
  item: {
    marginBottom: 20,
  },
  card: {
    width: '100%',
    borderColor: '#D5DDDC',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 20,
  },
  interactiveRow: {
    justifyContent: 'space-between',
  },
  cardCaption: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  heartIcon: {
    marginRight: 26,
  },
  iconsContainer: { width: 'auto', paddingHorizontal: 20 },
})

export default GallerySkeleton
