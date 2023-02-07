import React from 'react'
import { StyleSheet, View } from 'react-native'
import SettingsNavigationButton from '../../navigation/elements/NavigationButton.Settings'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import ScreenTopBlock from '../../navigation/elements/ScreenTopBlock'
import { ScreenHeaderStyles } from '../../navigation/elements/styles'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import UserAvatar from './UserAvatar'
import { User } from './types'

type UserScreenHeaderProps = {
  item: User
  label: string
  backAvailable?: boolean
}

const UserScreenHeader = React.memo(
  ({ item, label, backAvailable }: UserScreenHeaderProps) => {
    const { styles: headerStyles, colors } = useTheme(headerThemedStyles)

    return (
      <ScreenHeader
        backAvailable={backAvailable}
        style={headerStyles}
        title={label}
        headerRight={
          <SettingsNavigationButton iconColor={colors.appHeaderIconLight} />
        }
      />
    )

    // return (
    //   <View style={styles.container}>
    //     <ScreenTopBlock
    //       backAvailable={backAvailable}
    //       style={headerStyles}
    //       title={label}
    //       headerRight={
    //         <SettingsNavigationButton iconColor={colors.appHeaderIconLight} />
    //       }
    //     >
    //       <View style={styles.topBlock} />
    //     </ScreenTopBlock>
    //     <UserAvatar style={styles.avatar} item={item} />
    //   </View>
    // )
  }
)

const headerThemedStyles = createThemedStyle<ScreenHeaderStyles>((colors) =>
  StyleSheet.create({
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
  topBlock: {
    height: 80,
  },
})
export default UserScreenHeader
