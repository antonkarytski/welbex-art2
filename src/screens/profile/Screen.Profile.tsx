import { useStore } from 'effector-react'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import OfferToGetAuthorization from '../../features/auth/OfferToGetAuthorization'
import { $isAuth } from '../../features/auth/model'
import { useProfileDrawingsListTabs } from '../../features/profile/hooks'
import { $userProfile } from '../../features/profile/model'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import UserCountersBlock from '../../features/user/UserCountersBlock'
import UserScreenHeader from '../../features/user/UserScreenHeader'
import UserDrawingsListTabs from '../../features/user/drawingsList/UserDrawingsListTabs'
import { WINDOW_HEIGHT } from '../../lib/device/dimensions'
import GradientScreenHeader from '../../navigation/elements/GradientScreenHeader'
import { coloredScreenHeaderThemedStyles } from '../../styles/screen'
import { useText } from '../../translations/hook'

const ProfileScreen = () => {
  const text = useText()
  const profile = useStore($userProfile)
  const { styles } = useThemedStyleList({
    header: coloredScreenHeaderThemedStyles,
    common: themedStyles,
  })
  // TODO - delete and check if profile null
  const isAuth = useStore($isAuth)

  const profileGalleryTabsProps = useProfileDrawingsListTabs()

  return (
    <View style={styles.common.container}>
      {isAuth ? (
        <UserDrawingsListTabs
          tabsProps={profileGalleryTabsProps}
          style={styles.common.tabs}
        >
          <UserScreenHeader item={profile} label={text.myProfile} />
          <UserCountersBlock
            item={profile}
            style={styles.common.countersBlock}
          />
        </UserDrawingsListTabs>
      ) : (
        <>
          <GradientScreenHeader title={text.profile} />
          <ScrollView style={styles.common.unauthorizedContainer}>
            <OfferToGetAuthorization enableDescriptionText />
          </ScrollView>
        </>
      )}
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    countersBlock: {
      marginTop: 32,
    },
    tabs: {
      backgroundColor: colors.screenBackground,
    },
    unauthorizedContainer: {
      paddingHorizontal: 20,
      padding: WINDOW_HEIGHT / 4.8,
    },
    screen: {
      backgroundColor: colors.screenBackground,
    },
    screenHeaderLine: {
      backgroundColor: 'transparent',
    },
  })
)

export default ProfileScreen
