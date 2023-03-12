import { useStore } from 'effector-react'
import React from 'react'
import { LayoutChangeEvent } from 'react-native'
import SettingsNavigationButton from '../../navigation/elements/NavigationButton.Settings'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { useText } from '../../translations/hook'
import AdaptiveGradient from '../../ui/gradients/AdaptiveGradient'
import { $myProfile } from '../profile/model'
import { useThemeColors } from '../themed/hooks'
import { ColorThemeStructure } from '../themed/theme'
import { userName } from './helpers'
import { UserItem } from './types'

type UserHeaderProps = {
  item: UserItem
  onHeightChange?: (hight: number) => void
  height?: number
}

const headerRight = (colors: ColorThemeStructure) => {
  return <SettingsNavigationButton iconColor={colors.appHeaderIconLight} />
}

const UserHeader = ({ item, onHeightChange, height }: UserHeaderProps) => {
  const text = useText()
  const colors = useThemeColors()
  const myProfile = useStore($myProfile)
  const isMyProfile = item.id === myProfile?.id

  const handleLayout = (e: LayoutChangeEvent) => {
    const newHeight = e.nativeEvent.layout.height
    if (height !== newHeight) onHeightChange?.(e.nativeEvent.layout.height)
  }

  return (
    <AdaptiveGradient>
      <ScreenHeader
        title={!isMyProfile ? userName(item) : text.profile}
        headerRight={headerRight?.(colors)}
        onLayout={handleLayout}
        backAvailable={!isMyProfile}
        backArrowColor={colors.appHeaderIconLight}
      />
    </AdaptiveGradient>
  )
}

export default UserHeader
