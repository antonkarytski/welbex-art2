import { useStore } from 'effector-react'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import CategoryGallery from '../../features/categories/CategoryGallery'
import CategoryGalleryHeader from '../../features/categories/CategoryGalleryHeader'
import CategoryScreenHeader from '../../features/categories/CategoryScreenHeader'
import {
  categoryArtsRequest,
  categoryRequest,
} from '../../features/categories/request'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { links } from '../../navigation/links'
import { ScreenComponentProps } from '../../navigation/types.screenProps'
import Loader from '../../ui/Loader'

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

  const imageStyles = [
    styles.common.image,
    {
      height,
      transform: [{ translateY: imageTranslateY }],
    },
  ]

  if ((isLoadingCategory || isLoadingArts) && !isRefreshing) return <Loader />
  if (!category) return <CategoryScreenHeader />

  return (
    <View style={styles.common.container}>
      {category.image ? (
        <Animated.Image
          resizeMode={'cover'}
          style={imageStyles}
          source={{ uri: category.image }}
        />
      ) : (
        <Animated.View style={imageStyles} />
      )}

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
          <CategoryGalleryHeader
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
    image: {
      position: 'absolute',
      width: '100%',
      backgroundColor: colors.lightAccentDetails,
    },
  })
)

export default CategoryDetailsScreen
