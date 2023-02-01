import { useStore } from 'effector-react'
import React from 'react'
import { StyleSheet } from 'react-native'
import LogOutPopUp from '../../features/popUp/authPopUps/PopUp.LogOut'
import SettingsList from '../../features/settings/settingsList/SettingsList'
import { useThemedStyleList } from '../../features/themed/hooks'
import { buttonLightThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import LogoutButton from '../../ui/buttons/Button.Logout'
import OfferToGetAuthorization from '.././../features/auth/OfferToGetAuthorization'
import { $isAuth } from '.././../features/auth/model'
import SettingScreenContainer from './stylePresets/SettingScreenContainer'

const SettingsScreen = () => {
  const t = useText()
  const { styles } = useThemedStyleList({ button: buttonLightThemedPreset })
  const isAuth = useStore($isAuth)

  const onLogout = () => {
    LogOutPopUp.showSync()
  }
  // TODO: adds checking if user registered
  return (
    <SettingScreenContainer title={t.settings}>
      <SettingsList />
      {isAuth ? (
        <LogoutButton
          label={t.logOut}
          onPress={onLogout}
          preset={styles.button}
          style={{ button: screenStyles.logOutButton }}
        />
      ) : (
        <OfferToGetAuthorization style={screenStyles.authBlock} />
      )}
    </SettingScreenContainer>
  )
}

const screenStyles = StyleSheet.create({
  authBlock: {
    flexDirection: 'column-reverse',
  },
  logOutButton: {
    marginTop: 12,
  },
})

export default SettingsScreen
