import { useStore } from 'effector-react'
import React from 'react'
import { Animated } from 'react-native'
import SettingsNavigationButton from '../../navigation/elements/NavigationButton.Settings'
import { useText } from '../../translations/hook'
import { ColorThemeStructure } from '../themed/theme'
import UserTopBlock from '../user/UserTopBlock'
import { $userProfile } from './model'

type ProfileTopBlockProps = {
  offsetValue: Animated.Value | Animated.AnimatedInterpolation<number>
  onHeightChange: (height: number) => void
}

const headerRight = (colors: ColorThemeStructure) => {
  return <SettingsNavigationButton iconColor={colors.appHeaderIconLight} />
}

export const PROFILE_TOP_BLOCK_INITIAL_HEIGHT = 345
const ProfileTopBlock = ({
  offsetValue,
  onHeightChange,
}: ProfileTopBlockProps) => {
  const text = useText()
  const profile = useStore($userProfile)

  return (
    <UserTopBlock
      label={text.profile}
      item={profile}
      offsetValue={offsetValue}
      initialHeight={PROFILE_TOP_BLOCK_INITIAL_HEIGHT}
      onHeightChange={onHeightChange}
      headerRight={headerRight}
    />
  )
}

export default ProfileTopBlock
