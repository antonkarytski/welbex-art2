import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Sup from '../../ui/Sup'
import SettingsButton from './NavigationButton.Settings'
import ScreenHeader, { ScreenHeaderProps } from './ScreenHeader'
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
  onLayout?: ScreenHeaderProps['onLayout']
  onAfterGoBack?: () => void
}

const AppHeader = ({
  style,
  backAvailable,
  backArrowColor,
  settingsAvailable,
  settingsIconColor,
  iconsColor,
  onLayout,
  onAfterGoBack,
}: AppHeaderProps) => {
  return (
    <ScreenHeader
      style={style}
      onLayout={onLayout}
      backAvailable={backAvailable}
      backArrowColor={backArrowColor || iconsColor}
      headerRight={
        settingsAvailable && (
          <SettingsButton iconColor={settingsIconColor || iconsColor} />
        )
      }
      onAfterGoBack={onAfterGoBack}
    >
      <Sup style={style?.title} label={'ART'} supLabel={'2'} />
    </ScreenHeader>
  )
}

export default AppHeader
