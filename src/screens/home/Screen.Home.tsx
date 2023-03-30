import { useStore } from 'effector-react'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, LayoutChangeEvent, StyleSheet, View } from 'react-native'
import CategoriesList from '../../features/categories/CategoriesList'
import { categoriesListModel } from '../../features/categories/model'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import WinnersBlock from '../../features/winners/WinnersBlock'
import { winnersListModel } from '../../features/winners/request'
import { initAds } from '../../lib/ads/model.init'
import { noop } from '../../lib/helpers'
import AppHeader from '../../navigation/elements/AppHeader'
import { themedPrimaryMotionGradient } from '../../styles/gradients'
import { screenHeaderThemedStylesDark } from '../../styles/screen'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import MotionGradient from '../../ui/gradients/MotionGradient'
import CategoriesListSkeleton from '../../ui/loaders/Skeleton.CategoriesList'
import WinnersListSkeleton from '../../ui/loaders/Skeleton.Winners'

export default function HomeScreen() {
  const [headerHeight, setHeaderHeight] = useState(0)
  const [winnersBlockHeight, setWinnersBlockHeight] = useState(0)
  const { styles, colors } = useThemedStyleList({
    header: screenHeaderThemedStylesDark,
    headerTransparent: headerStyles,
    common: themedStyles,
    gradient: themedPrimaryMotionGradient,
  })
  const text = useText()
  const offset = useRef(new Animated.Value(0)).current
  const winnersList = useStore(winnersListModel.$items)
  const isWinnersLoading = useStore(winnersListModel.$isLoading)
  const isCategoriesLoading = useStore(categoriesListModel.$isLoading)

  const winnersListNotEmpty = winnersList.length > 0 || isWinnersLoading

  useEffect(() => {
    initAds().catch(noop)
    winnersListModel.getSync()
    categoriesListModel.getSync()
  }, [])

  const onScreenHeaderLayout = (e: LayoutChangeEvent) => {
    setHeaderHeight(e.nativeEvent.layout.height)
  }

  const onWinnersBlockLayout = (e: LayoutChangeEvent) => {
    if (winnersBlockHeight) return
    setWinnersBlockHeight(e.nativeEvent.layout.height)
  }

  const onCategoriesListScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: offset } } }],
    { useNativeDriver: true }
  )

  if (isWinnersLoading || isCategoriesLoading)
    return (
      <>
        <WinnersListSkeleton />
        <CategoriesListSkeleton />
      </>
    )

  return (
    <View style={styles.common.container}>
      {winnersListNotEmpty && (
        <MotionGradient
          minHeight={headerHeight}
          maxHeight={winnersBlockHeight + headerHeight}
          colors={styles.gradient}
          offsetValue={offset}
        />
      )}
      <AppHeader
        onLayout={onScreenHeaderLayout}
        style={winnersListNotEmpty ? styles.headerTransparent : styles.header}
        iconsColor={
          winnersListNotEmpty ? colors.appHeaderIconLight : colors.text
        }
        settingsAvailable={true}
      />
      <CategoriesList
        onScroll={onCategoriesListScroll}
        ListHeaderComponent={() => (
          <View>
            {winnersListNotEmpty && (
              <WinnersBlock onLayout={onWinnersBlockLayout} />
            )}
            <H2 style={styles.common.title} label={text.categories} />
          </View>
        )}
      />
    </View>
  )
}

const headerStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
    },
    title: {
      color: colors.whiteText,
    },
  })
)

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      color: colors.text,
      paddingLeft: 20,
    },
  })
)
