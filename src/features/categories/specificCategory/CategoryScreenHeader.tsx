import { useStore } from 'effector-react'
import React, { useEffect, useState } from 'react'
import { Animated, ViewProps } from 'react-native'
import { SpecificCategoryResponse } from '../../../api/parts/categories/types'
import ScreenHeader from '../../../navigation/elements/ScreenHeader'
import { links } from '../../../navigation/links'
import { BackSettingsProps } from '../../../navigation/types.screenProps'
import {
  screenHeaderThemedStylesDark,
  screenHeaderThemedStylesTransparent,
} from '../../../styles/screen'
import { useText } from '../../../translations/hook'
import { galleryFilterButtonGenerator } from '../../filters/NavigationButton.GalleryFilter'
import { useTheme } from '../../themed/hooks'
import { categoryDetailsModel } from './model'

type CategoryScreenHeaderProps = {
  onLayout?: ViewProps['onLayout']
  offset?: Animated.Value
  contentHeight?: number
  transparent?: boolean
  item?: SpecificCategoryResponse
}

const CategoryScreenHeader = ({
  item,
  onLayout,
  offset,
  contentHeight,
  transparent = true,
}: CategoryScreenHeaderProps) => {
  const text = useText()
  const category = useStore(categoryDetailsModel.$data)
  const [headerTitle, setHeaderTitle] = useState(text.category)

  const { styles, colors } = useTheme(
    transparent
      ? screenHeaderThemedStylesTransparent
      : screenHeaderThemedStylesDark
  )

  useEffect(() => {
    if (!offset || !contentHeight) return
    const id = offset.addListener(({ value }) => {
      if (value > contentHeight && category)
        return setHeaderTitle(category.name)
      setHeaderTitle(text.category)
    })
    return () => offset.removeListener(id)
  }, [contentHeight, offset, category, text])

  return (
    <ScreenHeader
      headerRight={galleryFilterButtonGenerator(colors, {
        initialCategory: item,
        ignoreMode: true,
        resultPageTitle: text.gallery,
        backSettings: {
          link: links.categoryDetails,
          params: { item: category },
        } as BackSettingsProps<links.categoryDetails>,
      })}
      onLayout={onLayout}
      backArrowColor={transparent ? colors.whiteText : colors.text}
      backAvailable
      style={styles}
      title={headerTitle}
    />
  )
}

export default CategoryScreenHeader
