import React from 'react'
import LogOutPopUp from '../../features/popUp/authPopUps/PopUp.LogOut'
import SettingsList from '../../features/settings/settingsList/SettingsList'
import { useThemedStyleList } from '../../features/themed/hooks'
import { buttonLightThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import LogoutButton from '../../ui/buttons/Button.Logout'
import SettingScreenContainer from './stylePresets/SettingScreenContainer'

const SettingsScreen = () => {
  const t = useText()
  const { styles } = useThemedStyleList({ button: buttonLightThemedPreset })
  const onLogout = () => {
    LogOutPopUp.showSync()
  }
  // TODO: adds checking if user registered
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
