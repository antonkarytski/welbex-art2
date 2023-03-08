import { useStore } from 'effector-react'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import {
  categoryArtsModel,
  categoryDetailsModel,
} from '../../features/categories/request'
import CategoryGallery from '../../features/categories/specificCategory/CategoryGallery'
import CategoryHeader from '../../features/categories/specificCategory/CategoryHeader'
import CategoryScreenHeader from '../../features/categories/specificCategory/CategoryScreenHeader'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { links } from '../../navigation/links'
import { ScreenComponentProps } from '../../navigation/types.screenProps'
import ImageGradient from '../../ui/gradients/ImageGradient'
import CategoryScreenSkeleton from '../../ui/loaders/Skeleton.CategoryScreen'

const CategoryDetailsScreen = ({
  route,
}: ScreenComponentProps<links.categoryDetails>) => {
  const categoryId = route.params.item.id
  const category = useStore(categoryDetailsModel.$data)
  const isLoadingCategory = useStore(categoryDetailsModel.$isLoading)
  const isLoadingArts = useStore(categoryArtsModel.$isLoading)

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
    categoryDetailsModel.get(categoryId)
    categoryArtsModel.get({ category_id: categoryId, active_competition: true })
  }, [categoryId])

  const [isRefreshing, setIsRefreshing] = useState(false)

  const onRefresh = async () => {
    setIsRefreshing(true)
    await categoryDetailsModel.get(categoryId)
    await categoryArtsModel.get({
      category_id: categoryId,
      active_competition: true,
    })
    setIsRefreshing(false)
  }

  const overlayAnimatedStyles = {
    transform: [{ translateY }],
  }
  if ((isLoadingCategory || isLoadingArts) && !isRefreshing) {
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
