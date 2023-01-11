import React from 'react'
import { StyleSheet, View } from 'react-native'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { useText } from '../../translations/hook'
import { createThemedStyle } from '../themed'
import { useThemedStyle } from '../themed/hooks'
import ProfileAvatar from './ProfileAvatar'

type ProfileHeaderProps = {}

const ProfileHeader = React.memo(({}: ProfileHeaderProps) => {
  const text = useText()
  const styles = useThemedStyle(themedStyles)

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ScreenHeader
          style={{
            title: styles.headerTitle,
            line: styles.headerLine,
          }}
          title={text.myProfile}
        />
      </View>
      <ProfileAvatar style={styles.avatar} />
    </View>
  )
})

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      marginBottom: -56,
    },
    headerContainer: {
      backgroundColor: colors.primary1,
      paddingBottom: 80,
    },
    headerTitle: {
      color: colors.whiteText,
    },
    headerLine: {
      backgroundColor: colors.primary2,
    },
    avatar: {
      transform: [{ translateY: -56 }],
      alignSelf: 'center',
    },
  })
)

export default ProfileHeader
