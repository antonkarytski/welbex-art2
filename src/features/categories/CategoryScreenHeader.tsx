import { useStore } from 'effector-react'
import React, { useEffect, useState } from 'react'
import { Animated, ViewProps } from 'react-native'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { screenHeaderThemedStylesTransparent } from '../../styles/screen'
import { useText } from '../../translations/hook'
import { useTheme } from '../themed/hooks'
import { categoryRequest } from './request'

type CategoryScreenHeaderProps = {
  onLayout?: ViewProps['onLayout']
  offset?: Animated.Value
  contentHeight?: number
}

const CategoryScreenHeader = ({
  onLayout,
  offset,
  contentHeight,
}: CategoryScreenHeaderProps) => {
  const text = useText()
  const category = useStore(categoryRequest.$data)
  const [headerTitle, setHeaderTitle] = useState(text.category)

  const { styles, colors } = useTheme(screenHeaderThemedStylesTransparent)

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
      backArrowColor={colors.whiteText}
      backAvailable
      style={styles}
      title={headerTitle}
    />
  )
}

export default CategoryScreenHeader
