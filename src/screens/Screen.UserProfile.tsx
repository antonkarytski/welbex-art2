import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import ProfileDrawingsListTabs from '../features/profile/ProfileDrawingsListTabs'
import UserCountersBlock from '../features/user/UserCountersBlock'
import UserScreenHeader from '../features/user/UserScreenHeader'
import { getUserExt } from '../features/user/request'
import { UserExt } from '../features/user/types'
import { links } from '../navigation/links'
import { ScreenComponentProps } from '../navigation/types.screenProps'

const UserProfileScreen = ({
  route,
}: ScreenComponentProps<links.userProfile>) => {
  const item = route.params.item
  const [userExt, setUserExt] = useState<UserExt | null>(null)

  useEffect(() => {
    getUserExt(item).then((result) => {
      if (result) setUserExt(result)
    })
  }, [item])

  return (
    <View style={styles.container}>
      <UserScreenHeader backAvailable item={item} label={item.name} />
      {userExt ? (
        <UserCountersBlock item={userExt} style={styles.countersBlock} />
      ) : null}
      <ProfileDrawingsListTabs style={styles.tabs} />
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

export default UserProfileScreen
