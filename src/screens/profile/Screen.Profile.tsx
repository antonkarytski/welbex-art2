import { useStore } from 'effector-react'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { $userProfile } from '../../features/profile/model'
import UserCountersBlock from '../../features/user/UserCountersBlock'
import UserScreenHeader from '../../features/user/UserScreenHeader'
import UserDrawingsListTabs from '../../features/user/drawingsList/UserDrawingsListTabs'
import { useText } from '../../translations/hook'

const ProfileScreen = () => {
  const text = useText()
  const profile = useStore($userProfile)

  return (
    <View style={styles.container}>
      <UserScreenHeader item={profile} label={text.myProfile} />
      <UserCountersBlock item={profile} style={styles.countersBlock} />
      <UserDrawingsListTabs item={profile} style={styles.tabs} />
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
})

export default ProfileScreen
