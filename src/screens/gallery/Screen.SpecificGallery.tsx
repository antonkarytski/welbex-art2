import { useStore } from 'effector-react'
import React from 'react'
import { galleryFilterButtonGenerator } from '../../features/filters/NavigationButton.GalleryFilter'
import FilteredGalleryList from '../../features/gallery/galleryFilter/FilteredGalleryList'
import { resetGalleryFilter } from '../../features/gallery/galleryFilter/model'
import {
  $activeGallery,
  getGalleryListRequest,
} from '../../features/gallery/model'
import { useThemedStyleList } from '../../features/themed/hooks'
import { useNavigate } from '../../navigation'
import GradientScreenHeader from '../../navigation/elements/GradientScreenHeader'
import { links } from '../../navigation/links'
import { ScreenComponentProps } from '../../navigation/types.screenProps'
import { themedPrimaryGradient } from '../../styles/gradients'
import { useText } from '../../translations/hook'

const SpecificGalleryScreens = ({
  route,
}: ScreenComponentProps<links.specificGalleryFiltered>) => {
  const t = useText()
  const params = route.params
  const navigate = useNavigate()
  const activeGallery = useStore($activeGallery)
  const { styles, colors } = useThemedStyleList({
    gradient: themedPrimaryGradient,
  })

  const onGoBack = () => {
    resetGalleryFilter()
    if (params?.backSettings) {
      //@ts-ignore
      navigate(params.backSettings.link, params.backSettings.params)
      return
    }
    getGalleryListRequest(activeGallery.type)
    navigate(links.galleryTab)
  }

  return (
    <>
      <GradientScreenHeader
        title={params?.resultPageTitle || activeGallery.title(t)}
        backAvailable
        onPressBack={onGoBack}
        headerRight={galleryFilterButtonGenerator(colors)}
        gradient={{ colors: styles.gradient }}
      />
      <FilteredGalleryList />
    </>
  )
}

export default SpecificGalleryScreens
