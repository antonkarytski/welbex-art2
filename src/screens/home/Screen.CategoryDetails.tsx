import { useStore } from 'effector-react'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import {
  categoryArtsRequest,
  categoryRequest,
} from '../../features/categories/request'
import CategoryGallery from '../../features/categories/specificCategory/CategoryGallery'
import CategoryHeader from '../../features/categories/specificCategory/CategoryHeader'
import CategoryScreenHeader from '../../features/categories/specificCategory/CategoryScreenHeader'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { links } from '../../navigation/links'
import { ScreenComponentProps } from '../../navigation/types.screenProps'
import Loader from '../../ui/Loader'
import ImageGradient from '../../ui/gradients/ImageGradient'

const CategoryDetailsScreen = ({
  route,
}: ScreenComponentProps<links.categoryDetails>) => {
  const categoryId = route.params.item.id
  const category = useStore(categoryRequest.$data)
  const isLoadingCategory = useStore(categoryRequest.$isLoading)
  const isLoadingArts = useStore(categoryArtsRequest.$isLoading)

  const { styles } = useThemedStyleList({
    common: themedStyles,
  })
  const [minHeight, setMinHeight] = useState(0)
  const [contentHeight, setContentHeight] = useState(0)
  const offset = useRef(new Animated.Value(0)).current

  //Rework scroll
  const height = minHeight + contentHeight
  const translateY = offset.interpolate({
    inputRange: [0, contentHeight],
    outputRange: [contentHeight + minHeight, minHeight],
    extrapolateRight: 'clamp',
  })
  const imageTranslateY = offset.interpolate({
    inputRange: [0, contentHeight * 2],
    outputRange: [0, -minHeight / 2],
    extrapolate: 'clamp',
  })

  useEffect(() => {
    categoryRequest.get(categoryId)
    categoryArtsRequest.get({ id: categoryId })
  }, [categoryId])

  const [isRefreshing, setIsRefreshing] = useState(false)

  const onRefresh = async () => {
    setIsRefreshing(true)
    await categoryRequest.get(categoryId)
    await categoryArtsRequest.get({ id: categoryId })
    setIsRefreshing(false)
  }

  const overlayAnimatedStyles = {
    transform: [{ translateY }],
  }

  if ((isLoadingCategory || isLoadingArts) && !isRefreshing) return <Loader />
  if (!category) return <CategoryScreenHeader />

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
        {category.image ? (
          <ImageGradient
            imageHeight={height}
            source={{ uri: category.image }}
          />
        ) : (
          <View style={[styles.common.imageSkeleton, { height }]} />
        )}
      </Animated.View>
      <Animated.View style={[styles.common.overlay, overlayAnimatedStyles]} />
      <CategoryScreenHeader
        offset={offset}
        contentHeight={contentHeight}
        onLayout={({ nativeEvent }) => {
          if (!minHeight) setMinHeight(nativeEvent.layout.height)
        }}
      />
      <CategoryGallery
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: true }
        )}
        header={
          <CategoryHeader
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
      backgroundColor: 'white',
      width: '100%',
      height: 1000,
    },
    headerImageContainer: {
      position: 'absolute',
      width: '100%',
    },
    imageSkeleton: {
      width: '100%',
      zIndex: -1,
      backgroundColor: colors.lightAccentDetails,
    },
  })
)

export default CategoryDetailsScreen
