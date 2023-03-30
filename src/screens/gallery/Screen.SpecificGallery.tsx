import { useStore } from 'effector-react'
import React from 'react'
import FilteredGalleryList from '../../features/gallery/galleryFilter/FilteredGalleryList'
import { resetGalleryFilter } from '../../features/gallery/galleryFilter/model'
import {
  $activeGallery,
  getGalleryListRequest,
} from '../../features/gallery/model'
import { useThemedStyleList } from '../../features/themed/hooks'
import { ColorThemeStructure } from '../../features/themed/theme'
import { useNavigate } from '../../navigation'
import GradientScreenHeader from '../../navigation/elements/GradientScreenHeader'
import NavigationFilterButton from '../../navigation/elements/NavigationButton.GalleryFilter'
import { links } from '../../navigation/links'
import { themedPrimaryGradient } from '../../styles/gradients'
import { useText } from '../../translations/hook'

const screenHeaderRight = (colors: ColorThemeStructure) => (
  <NavigationFilterButton iconColor={colors.appHeaderIconLight} />
)

const SpecificGalleryScreens = () => {
  const t = useText()
  const navigate = useNavigate()
  const activeGallery = useStore($activeGallery)
  const { styles, colors } = useThemedStyleList({
    gradient: themedPrimaryGradient,
  })

  const onGoBack = () => {
    resetGalleryFilter()
    getGalleryListRequest(activeGallery.type)
    navigate(links.galleryTab)
  }

  return (
    <>
      <GradientScreenHeader
        title={activeGallery.title(t)}
        backAvailable
        onPressBack={onGoBack}
        headerRight={screenHeaderRight(colors)}
        gradient={{ colors: styles.gradient }}
      />
      <FilteredGalleryList />
    </>
  )
}

export default SpecificGalleryScreens
