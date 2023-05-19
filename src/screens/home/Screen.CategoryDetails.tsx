import { useStore } from 'effector-react'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import {
  categoryDetailsModel,
  getCategoryData,
  setCategoryId,
} from '../../features/categories/specificCategory'
import CategoryGallery from '../../features/categories/specificCategory/CategoryGallery'
import CategoryHeader from '../../features/categories/specificCategory/CategoryHeader'
import CategoryScreenHeader from '../../features/categories/specificCategory/CategoryScreenHeader'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { noop } from '../../lib/helpers'
import { links } from '../../navigation/links'
import { ScreenComponentProps } from '../../navigation/types.screenProps'
import ImageGradient from '../../ui/gradients/ImageGradient'
import CategoryScreenSkeleton from '../../ui/loaders/Skeleton.CategoryScreen'

const CategoryDetailsScreen = ({
  route,
}: ScreenComponentProps<links.categoryDetails>) => {
  const categoryId = route.params.item.id
  const label = route.params.item.name
  const category = useStore(categoryDetailsModel.$data)
  const isLoadingCategory = useStore(categoryDetailsModel.$isLoading)
  const { styles } = useThemedStyleList({
    common: themedStyles,
  })
  const [screenHeaderHeight, setScreenHeaderHeight] = useState(0)
  const [contentHeight, setContentHeight] = useState(0)
  const offset = useRef(new Animated.Value(0)).current

  const height = screenHeaderHeight + contentHeight

  const translateY = offset.interpolate({
    inputRange: [0, contentHeight],
    outputRange: [height, screenHeaderHeight],
    extrapolateRight: 'clamp',
  })

  const imageTranslateY = offset.interpolate({
    inputRange: [0, contentHeight * 2],
    outputRange: [0, -screenHeaderHeight / 2],
    extrapolate: 'clamp',
  })

  useEffect(() => {
    getCategoryData(categoryId).catch(noop)
    setCategoryId(categoryId)
  }, [categoryId])

  const [isRefreshing, setIsRefreshing] = useState(false)

  const onRefresh = () => {
    setIsRefreshing(true)
    getCategoryData(categoryId).finally(() => setIsRefreshing(false))
  }

  const overlayAnimatedStyles = {
    transform: [{ translateY }],
  }

  if (isLoadingCategory && !isRefreshing) {
    return <CategoryScreenSkeleton />
  }

  if (!category) return <CategoryScreenHeader transparent={false} />

  return (
    <View style={styles.common.container}>
      <Animated.View
        style={[
          styles.common.headerImageContainer,
          {
            height,
            transform: [{ translateY: imageTranslateY }],
          },
        ]}
      >
        <ImageGradient
          imageHeight={height}
          source={category.image ? { uri: category.image } : null}
        />
      </Animated.View>
      <Animated.View style={[styles.common.overlay, overlayAnimatedStyles]} />
      <CategoryScreenHeader
        item={{ ...category, name: label }}
        offset={offset}
        contentHeight={contentHeight}
        onLayout={({ nativeEvent }) => {
          if (!screenHeaderHeight)
            setScreenHeaderHeight(nativeEvent.layout.height)
        }}
      />
      <CategoryGallery
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: true }
        )}
        header={
          <CategoryHeader
            item={{ ...category, name: label }}
            onLayout={({ nativeEvent }) => {
              if (!contentHeight) setContentHeight(nativeEvent.layout.height)
            }}
          />
        }
        item={category}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: { flex: 1 },
    overlay: {
      position: 'absolute',
      backgroundColor: colors.screenBackground,
      width: '100%',
      height: 1000,
    },
    headerImageContainer: {
      position: 'absolute',
      width: '100%',
    },
  })
)

export default CategoryDetailsScreen
