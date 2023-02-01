import { useStore } from 'effector-react'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import OfferToGetAuthorization from '../../features/auth/OfferToGetAuthorization'
import { $isAuth } from '../../features/auth/model'
import ProfileDrawingsListTabs from '../../features/profile/ProfileDrawingsListTabs'
import { $userProfile } from '../../features/profile/model'
import { useThemedStyle } from '../../features/themed/hooks'
import UserCountersBlock from '../../features/user/UserCountersBlock'
import UserScreenHeader from '../../features/user/UserScreenHeader'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { coloredScreenHeaderThemedStyles } from '../../styles/screen'
import { useText } from '../../translations/hook'

const ProfileScreen = () => {
  const text = useText()
  const profile = useStore($userProfile)
  const headerStyles = useThemedStyle(coloredScreenHeaderThemedStyles)
  // TODO - delete and check if profile null
  const isAuth = useStore($isAuth)
  // TODO

  return (
    <View style={styles.container}>
      {isAuth ? (
        <>
          <UserScreenHeader item={profile} label={text.myProfile} />
          <UserCountersBlock item={profile} style={styles.countersBlock} />
          <ProfileDrawingsListTabs style={styles.tabs} />
        </>
      ) : (
        <>
          <ScreenHeader title={text.profile} style={headerStyles} />
          <View style={styles.unauthorizedContainer}>
            <OfferToGetAuthorization enableDescriptionText />
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countersBlock: {
    marginTop: 32,
  },
  tabs: {
    marginTop: 20,
  },
  unauthorizedContainer: {
    paddingHorizontal: 20,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
})

export default ProfileScreen
