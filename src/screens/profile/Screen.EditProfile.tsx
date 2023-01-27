import React from 'react'
import { ScrollView } from 'react-native'
import EditProfileForm from '../../features/profile/editProfile/EditProfileForm'
import { useThemedStyleList } from '../../features/themed/hooks'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import {
  darkScreenHeaderThemedStyles,
  lightScreenThemedBackground,
} from '../../styles/screen'
import { useText } from '../../translations/hook'
import ScreenContainer from '../../ui/ScreenContainer'
import ScreenWrapper from '../../ui/ScreenWrapper'

export default function EditProfileScreen() {
  const t = useText()
  const { styles, colors } = useThemedStyleList({
    screenHeader: darkScreenHeaderThemedStyles,
    screen: lightScreenThemedBackground,
  })

  return (
    <ScreenWrapper style={[styles.screen.background]}>
      <ScreenHeader
        backAvailable
        title={t.editProfile}
        backArrowColor={colors.appHeaderIconDark}
        style={styles.screenHeader}
      />
      <ScrollView>
        <ScreenContainer style={styles.screen.background}>
          <EditProfileForm />
        </ScreenContainer>
      </ScrollView>
    </ScreenWrapper>
  )
}
