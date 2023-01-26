import React from 'react'
import { StyleSheet } from 'react-native'
import GalleryFilter from '../../features/gallery/galleryFilter/GalleryFilter'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { useText } from '../../translations/hook'
import ScreenContainer from '../../ui/ScreenContainer'
import ScreenWrapper from '../../ui/ScreenWrapper'

export default function GalleryFilterScreen() {
  const t = useText()
  const { styles, colors } = useThemedStyleList({
    screenHeader: themedScreenHeaderStyles,
    common: themedStyles,
  })
  return (
    <ScreenWrapper style={styles.common.wrapper}>
      <ScreenHeader
        backAvailable
        title={t.filters}
        backArrowColor={colors.appHeaderIconDark}
        style={styles.screenHeader}
      />
      <ScreenContainer style={styles.common.wrapper}>
        <GalleryFilter />
      </ScreenContainer>
    </ScreenWrapper>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: colors.screenBackground,
    },
  })
)

const themedScreenHeaderStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    title: {
      color: colors.appHeaderTextDark,
      fontSize: 18,
      fontWeight: '600',
    },
    line: {
      backgroundColor: colors.appHeaderBorderDark,
    },
    container: {
      backgroundColor: colors.screenBackground,
    },
  })
)
