import React from 'react'
import { setIsAuth } from '../../features/auth/model'
import SettingsList from '../../features/settings/SettingsList'
import { useThemedStyleList } from '../../features/themed/hooks'
import { buttonLightThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import LogoutButton from '../../ui/buttons/Button.Logout'
import SettingScreenContainer from './stylePresets/SettingScreenContainer'

const SettingsScreen = () => {
  const t = useText()
  const { styles } = useThemedStyleList({ button: buttonLightThemedPreset })
  const onLogout = () => {
    setIsAuth(false)
  }
  // TO DO: adds checking if user registered (show logout button or not)
  return (
    <SettingScreenContainer title={t.settings}>
      <SettingsList />
      <LogoutButton
        label={t.logOut}
        onPress={onLogout}
        preset={styles.button}
      />
    </SettingScreenContainer>
  )
}

export default SettingsScreen
