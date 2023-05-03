import React, { useEffect } from 'react'
import GlobalMonthPicker from '../../features/filters/monthPicker/GlobalMonthPicker'
import GalleryFilter from '../../features/gallery/galleryFilter/GalleryFilter'
import {
  categoriesFilterModel,
  ignoreModeFilterModel,
} from '../../features/gallery/galleryFilter/model'
import { useThemedStyleList } from '../../features/themed/hooks'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { links } from '../../navigation/links'
import { ScreenComponentProps } from '../../navigation/types.screenProps'
import {
  lightScreenThemedBackground,
  screenHeaderThemedStylesDark,
} from '../../styles/screen'
import { useText } from '../../translations/hook'
import ScreenContainer from '../../ui/ScreenContainer'
import ScreenWrapper from '../../ui/ScreenWrapper'

export default function GalleryFilterScreen({
  route,
}: ScreenComponentProps<links.galleryFilter>) {
  const params = route.params
  const t = useText()
  const { styles, colors } = useThemedStyleList({
    screenHeader: screenHeaderThemedStylesDark,
    screen: lightScreenThemedBackground,
  })

  useEffect(() => {
    if (params?.initialCategory) {
      categoriesFilterModel.set([params.initialCategory])
    }
    ignoreModeFilterModel.set(!!params?.ignoreMode)
  }, [params])

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
          <GalleryFilter resultPageTitle={route.params?.resultPageTitle} />
        </ScreenContainer>
      </ScreenWrapper>
      <GlobalMonthPicker />
    </>
  )
}
