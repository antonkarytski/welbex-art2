import { useStore } from 'effector-react'
import React from 'react'
import { StyleSheet } from 'react-native'
import LogoutButton from '../../features/auth/logOut/Button.Logout'
import { $isAuth } from '../../features/auth/model'
import SettingsList from '../../features/settings/settingsList/SettingsList'
import { useText } from '../../translations/hook'
import OfferToGetAuthorization from '.././../features/auth/OfferToGetAuthorization'
import SettingScreenContainer from './stylePresets/SettingScreenContainer'

const SettingsScreen = () => {
  const t = useText()
  const isAuth = useStore($isAuth)

  return (
    <SettingScreenContainer title={t.settings}>
      <SettingsList />
      {isAuth ? (
        <LogoutButton style={{ button: screenStyles.logOutButton }} />
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
