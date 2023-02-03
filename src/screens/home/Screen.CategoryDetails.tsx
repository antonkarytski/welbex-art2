import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native'
import CategoryDetailsHeader from '../../features/categories/CategoryDetailsHeader'
import CategoryGallery from '../../features/categories/CategoryGallery'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { ScreenHeaderStyles } from '../../navigation/elements/styles'
import { links } from '../../navigation/links'
import { ScreenComponentProps } from '../../navigation/types.screenProps'
import { useText } from '../../translations/hook'
import H1 from '../../ui/H1'
import Span from '../../ui/Span'

const CategoryDetailsScreen = ({
  route,
}: ScreenComponentProps<links.categoryDetails>) => {
  const category = route.params.item
  const text = useText()
  const { styles, colors } = useThemedStyleList({
    header: headerThemedStyles,
    common: themedStyles,
  })
  const [headerTitle, setHeaderTitle] = useState(text.category)
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
    const id = offset.addListener(({ value }) => {
      if (value > contentHeight) return setHeaderTitle(category.label)
      setHeaderTitle(text.category)
    })
    return () => offset.removeListener(id)
  }, [contentHeight, offset])
  const overlayAnimatedStyles = {
    transform: [{ translateY }],
  }
  return (
    <View style={styles.common.container}>
      <Animated.Image
        resizeMode={'cover'}
        style={{
          position: 'absolute',
          width: '100%',
          height,
          transform: [{ translateY: imageTranslateY }],
        }}
        source={category.image}
      />
      <Animated.View style={[styles.common.overlay, overlayAnimatedStyles]} />
      <ScreenHeader
        onLayout={({ nativeEvent }) => {
          if (!minHeight) setMinHeight(nativeEvent.layout.height)
        }}
        backArrowColor={colors.whiteText}
        backAvailable
        style={styles.header}
        title={headerTitle}
      />
      <CategoryGallery
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: true }
        )}
        header={
          <View
            onLayout={({ nativeEvent }) => {
              if (!contentHeight) setContentHeight(nativeEvent.layout.height)
            }}
            style={styles.common.content}
          >
            <H1 style={styles.common.title} label={category.label} />
            <Span style={styles.common.term} label={category.term} />
          </View>
        }
        item={category}
      />
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: { flex: 1 },
    content: {
      paddingHorizontal: 20,
    },
    title: {
      color: colors.whiteText,
      marginBottom: 12,
    },
    term: {
      color: colors.whiteText,
      marginBottom: 36,
    },
    overlay: {
      position: 'absolute',
      backgroundColor: 'white',
      width: '100%',
      height: 1000,
    },
  })
)

const headerThemedStyles = createThemedStyle<ScreenHeaderStyles>((colors) =>
  StyleSheet.create({
    line: {
      backgroundColor: colors.line,
    },
  })
)

export default CategoryDetailsScreen
