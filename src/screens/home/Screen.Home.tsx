import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import CategoriesList from '../../features/categories/CategoriesList'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import WinnersBlock from '../../features/winners/WinnersBlock'
import { getWinners } from '../../features/winners/request'
import AppHeader from '../../navigation/elements/AppHeader'
import { themedPrimaryMotionGradient } from '../../styles/gradients'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import MotionGradient from '../../ui/gradients/MotionGradient'

export default function HomeScreen() {
  const [headerHeight, setHeaderHeight] = useState(0)
  const [winnersBlockHeight, setWinnersBlockHeight] = useState(0)
  const { styles, colors } = useThemedStyleList({
    header: headerStyles,
    common: themedStyles,
    gradient: themedPrimaryMotionGradient,
  })
  const text = useText()

  const offset = useRef(new Animated.Value(0)).current

  useEffect(() => {
    getWinners()
  }, [])

  return (
    <View style={styles.common.container}>
      <MotionGradient
        minHeight={headerHeight}
        maxHeight={winnersBlockHeight + headerHeight}
        colors={styles.gradient}
        offsetValue={offset}
      />
      <AppHeader
        onLayout={({ nativeEvent }) => {
          setHeaderHeight(nativeEvent.layout.height)
        }}
        style={styles.header}
        iconsColor={colors.appHeaderIconLight}
        settingsAvailable={true}
      />
      <CategoriesList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: true }
        )}
        ListHeaderComponent={() => {
          return (
            <View>
              <WinnersBlock
                onLayout={({ nativeEvent }) => {
                  if (winnersBlockHeight) return
                  setWinnersBlockHeight(nativeEvent.layout.height)
                }}
              />
              <H2 style={styles.common.title} label={text.categories} />
            </View>
          )
        }}
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
