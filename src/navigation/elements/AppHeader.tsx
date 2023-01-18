import React, { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Sup from '../../ui/Sup'
import SettingsButton from './NavigationButton.Settings'
import ScreenHeader from './ScreenHeader'
import { ScreenHeaderStyles } from './styles'

type AppHeaderProps = {
  style?: ScreenHeaderStyles & {
    settingsButton?: StyleProp<ViewStyle>
  }
  backAvailable?: boolean
  backArrowColor?: string
  settingsAvailable?: boolean
  settingsIconColor?: string
  headerRight?: ReactNode
  iconsColor?: string
}

const AppHeader = ({
  style,
  backAvailable,
  backArrowColor,
  settingsAvailable = true,
  settingsIconColor,
  headerRight,
  iconsColor,
}: AppHeaderProps) => {
  const rightHeaderComponent =
    headerRight || settingsAvailable ? (
      <SettingsButton iconColor={settingsIconColor || iconsColor} />
    ) : null

  return (
    <ScreenHeader
      style={style}
      backAvailable={backAvailable}
      backArrowColor={backArrowColor || iconsColor}
      headerRight={rightHeaderComponent}
    >
      <Sup style={style?.title} label={'ART'} supLabel={'2'} />
    </ScreenHeader>
  )
}

export default AppHeader
