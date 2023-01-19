import React from 'react'
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
  iconsColor?: string
}

const AppHeader = ({
  style,
  backAvailable,
  backArrowColor,
  settingsAvailable,
  settingsIconColor,
  iconsColor,
}: AppHeaderProps) => {
  return (
    <ScreenHeader
      style={style}
      backAvailable={backAvailable}
      backArrowColor={backArrowColor || iconsColor}
      headerRight={
        settingsAvailable && (
          <SettingsButton iconColor={settingsIconColor || iconsColor} />
        )
      }
    >
      <Sup style={style?.title} label={'ART'} supLabel={'2'} />
    </ScreenHeader>
  )
}

export default AppHeader
