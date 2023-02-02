import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { createThemedStyle } from '../features/themed'
import { useThemedStyle } from '../features/themed/hooks'
import UserCountersBlock from '../features/user/UserCountersBlock'
import UserScreenHeader from '../features/user/UserScreenHeader'
import UserDrawingsListTabs from '../features/user/drawingsList/UserDrawingsListTabs'
import { useChildrenDrawingsListTabs } from '../features/user/drawingsList/hooks.drawingTabs'
import { getUserExt } from '../features/user/request'
import { UserExt } from '../features/user/types'
import { links } from '../navigation/links'
import { ScreenComponentProps } from '../navigation/types.screenProps'

const UserProfileScreen = ({
  route,
}: ScreenComponentProps<links.userProfile>) => {
  const item = route.params.item
  const [userExt, setUserExt] = useState<UserExt | null>(null)
  const userGalleryTabsProps = useChildrenDrawingsListTabs(item)
  const styles = useThemedStyle(themedStyles)

  useEffect(() => {
    getUserExt(item).then((result) => {
      if (result) setUserExt(result)
    })
  }, [item])

  return (
    <UserDrawingsListTabs tabsProps={userGalleryTabsProps}>
      <UserScreenHeader backAvailable item={item} label={item.name} />
      {userExt ? (
        <UserCountersBlock item={userExt} style={styles.countersBlock} />
      ) : null}
    </UserDrawingsListTabs>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    countersBlock: {
      marginTop: 32,
    },
    tabs: {
      backgroundColor: colors.screenBackground,
    },
  })
)

export default UserProfileScreen
