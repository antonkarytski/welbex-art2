import React from 'react'
import GalleryFilter from '../../features/gallery/galleryFilter/GalleryFilter'
import { useThemedStyleList } from '../../features/themed/hooks'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import {
  lightScreenThemedBackground,
  transparentScreenHeaderThemedStyles,
} from '../../styles/screen'
import { useText } from '../../translations/hook'
import ScreenContainer from '../../ui/ScreenContainer'
import ScreenWrapper from '../../ui/ScreenWrapper'

export default function GalleryFilterScreen() {
  const t = useText()
  const { styles, colors } = useThemedStyleList({
    screenHeader: transparentScreenHeaderThemedStyles,
    screen: lightScreenThemedBackground,
  })

  return (
    <ScreenWrapper style={styles.screen.background}>
      <ScreenHeader
        backAvailable
        title={t.filters}
        backArrowColor={colors.appHeaderIconDark}
        style={styles.screenHeader}
      />
      <ScreenContainer style={styles.screen.background} enableScrollView>
        <GalleryFilter />
      </ScreenContainer>
    </ScreenWrapper>
  )
}
