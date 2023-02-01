import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, FlatList, StyleSheet, View } from 'react-native'
import { MOCK_CATEGORIES } from '../../_mock/categories'
import { WINNERS_MOCK } from '../../_mock/winners'
import CardCategory from '../../features/categories/Card.Category'
import { categoryCardThemedStyles } from '../../features/categories/styles'
import { CompetitionCategory } from '../../features/categories/types'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import CardWinner from '../../features/winners/Card.Winner'
import { winnerCardThemedStyles } from '../../features/winners/styles'
import { IWinner } from '../../features/winners/types'
import AppHeader from '../../navigation/elements/AppHeader'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Gradient from '../../ui/gradients/Gradient'
import { primaryGradientPreset } from '../../ui/gradients/styles'

const keyExtractor = ({ id }: IWinner) => id
const categoryKeyExtractor = ({ name }: CompetitionCategory) => name

export default function HomeScreen() {
  const [headerHeight, setHeaderHeight] = useState(0)
  const [contentHeight, setContentHeight] = useState(0)
  const { styles, colors } = useThemedStyleList({
    common: themedStyles,
    card: winnerCardThemedStyles,
    header: headerStyles,
    categories: categoriesThemedStyles,
    categoryCard: categoryCardThemedStyles,
  })
  const text = useText()

  const renderWinnerItem = useCallback(
    ({ item }: { item: IWinner }) => {
      return (
        <CardWinner
          category={item.category}
          authorName={item.author.name}
          yearsCategory={item.yearsCategory}
          image={item.image}
          styles={styles.card}
          offsetY={100}
        />
      )
    },
    [styles]
  )

  const renderCategoriesItem = useCallback(
    ({ item }: { item: CompetitionCategory }) => {
      return <CardCategory item={item} styles={styles.categoryCard} />
    },
    [styles]
  )

  const offset = useRef(new Animated.Value(0)).current
  const animatedHeight = useRef(new Animated.Value(0)).current
  useEffect(() => {
    if (!contentHeight || !headerHeight) return
    animatedHeight.setValue(contentHeight + headerHeight)
  }, [contentHeight, headerHeight, animatedHeight])
  const gradientColors = primaryGradientPreset(colors)
  useEffect(() => {
    const id = offset.addListener(({ value }) => {
      animatedHeight.setValue(Math.max(contentHeight - value, 0) + headerHeight)
    })
    return () => offset.removeListener(id)
  }, [offset, animatedHeight, contentHeight, headerHeight])

  return (
    <View style={styles.common.wrapper}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: '100%',
            top: 0,
            height: animatedHeight,
          },
        ]}
      >
        <Gradient
          startColor={gradientColors.start}
          endColor={gradientColors.end}
        />
      </Animated.View>
      <AppHeader
        onLayout={({ nativeEvent }) => {
          setHeaderHeight(nativeEvent.layout.height)
        }}
        style={styles.header}
        iconsColor={colors.appHeaderIconLight}
        settingsAvailable={true}
      />
      <View style={styles.categories.container}>
        <Animated.FlatList
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: offset } } }],
            { useNativeDriver: true }
          )}
          ListHeaderComponent={() => {
            return (
              <View>
                <View
                  onLayout={({ nativeEvent }) => {
                    if (contentHeight) return
                    setContentHeight(nativeEvent.layout.height)
                  }}
                  style={styles.common.container}
                >
                  <H2 style={styles.common.title} label={text.winners} />
                  <FlatList
                    contentContainerStyle={styles.common.listContent}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={WINNERS_MOCK}
                    renderItem={renderWinnerItem}
                    keyExtractor={keyExtractor}
                  />
                </View>
                <H2 style={styles.categories.title} label={text.categories} />
              </View>
            )
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.categories.listContent}
          data={MOCK_CATEGORIES}
          renderItem={renderCategoriesItem}
          keyExtractor={categoryKeyExtractor}
        />
      </View>
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
    wrapper: {
      flex: 1,
    },
    firstCard: {
      marginLeft: 0,
    },
    container: {
      width: '100%',
      paddingBottom: 24,
      //height: 445,
    },
    contentContainer: {},
    listContent: {
      //paddingRight: 20,
    },
    title: {
      color: colors.navigationLabelSelected,
      paddingLeft: 20,
    },
  })
)

const categoriesThemedStyles = createThemedStyle(() =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      paddingLeft: 20,
    },
    listContent: {
      //paddingHorizontal: 20,
    },
  })
)
