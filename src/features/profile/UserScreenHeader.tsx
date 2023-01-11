import { useStore } from 'effector-react'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import WideScreenHeader from '../../navigation/elements/WideScreenHeader'
import { ScreenHeaderStyles } from '../../navigation/elements/styles'
import { useText } from '../../translations/hook'
import { createThemedStyle } from '../themed'
import { useThemedStyle } from '../themed/hooks'
import UserAvatar from '../user/UserAvatar'
import { User } from '../user/types'
import { $userProfile } from './model'

type UserScreenHeaderProps = {
  item: User
  label: string
}

const UserScreenHeader = React.memo(
  ({ item, label }: UserScreenHeaderProps) => {
    const headerStyles = useThemedStyle(headerThemedStyles)
    const user = useStore($userProfile)

    return (
      <View style={styles.container}>
        <WideScreenHeader style={headerStyles} label={label} />
        <UserAvatar style={styles.avatar} item={user} />
      </View>
    )
  }
)

const headerThemedStyles = createThemedStyle<ScreenHeaderStyles>((colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.primary1,
    },
    line: {
      backgroundColor: colors.primary2,
    },
    title: {
      color: colors.whiteText,
    },
  })
)

const styles = StyleSheet.create({
  container: {
    marginBottom: -56,
  },
  avatar: {
    transform: [{ translateY: -56 }],
    alignSelf: 'center',
  },
})
export default UserScreenHeader
