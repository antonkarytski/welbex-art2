import { useStore } from 'effector-react'
import React, { useEffect, useState } from 'react'
import { Animated, ViewProps } from 'react-native'
import ScreenHeader from '../../../navigation/elements/ScreenHeader'
import {
  screenHeaderThemedStylesDark,
  screenHeaderThemedStylesTransparent,
} from '../../../styles/screen'
import { useText } from '../../../translations/hook'
import { useTheme } from '../../themed/hooks'
import { categoryDetailsModel } from '../request'

type CategoryScreenHeaderProps = {
  onLayout?: ViewProps['onLayout']
  offset?: Animated.Value
  contentHeight?: number
  transparent?: boolean
}

const CategoryScreenHeader = ({
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
      onLayout={onLayout}
      backArrowColor={transparent ? colors.whiteText : colors.text}
      backAvailable
      style={styles}
      title={headerTitle}
    />
  )
}

export default CategoryScreenHeader
