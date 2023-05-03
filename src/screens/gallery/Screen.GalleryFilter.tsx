import React from 'react'
import MonthPicker from 'react-native-month-year-picker'
import { START_DATE } from '../../constants/app'
import GalleryFilter from '../../features/gallery/galleryFilter/GalleryFilter'
import { useThemedStyleList } from '../../features/themed/hooks'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import {
  lightScreenThemedBackground,
  screenHeaderThemedStylesDark,
} from '../../styles/screen'
import { useText } from '../../translations/hook'
import ScreenContainer from '../../ui/ScreenContainer'
import ScreenWrapper from '../../ui/ScreenWrapper'

export default function GalleryFilterScreen() {
  const t = useText()
  const { styles, colors } = useThemedStyleList({
    screenHeader: screenHeaderThemedStylesDark,
    screen: lightScreenThemedBackground,
  })

  return (
    <>
      <ScreenWrapper style={styles.screen.background}>
        <ScreenHeader
          backAvailable
          title={t.filters}
          backArrowColor={colors.appHeaderIconDark}
          style={styles.screenHeader}
        />
        <ScreenContainer
          style={styles.screen.background}
          offBounces
          enableScrollView
        >
          <GalleryFilter />
        </ScreenContainer>
      </ScreenWrapper>
      <MonthPicker
        minimumDate={START_DATE}
        maximumDate={new Date()}
        value={new Date()}
      />
    </>
  )
}
