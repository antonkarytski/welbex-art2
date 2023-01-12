import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useText } from '../../translations/hook'
import ValueCard from '../../ui/cards/ValueCard'
import { whiteCardThemedStyle } from '../../ui/cards/styles'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import { UserExt } from './types'

type UserCountersBlockProps = {
  item: UserExt
  style?: StyleProp<ViewStyle>
}

const UserCountersBlock = ({ item, style }: UserCountersBlockProps) => {
  const text = useText()
  const { styles } = useTheme(themedStyles)

  return (
    <View style={[styles.container, style]}>
      <ValueCard
        style={styles.card}
        value={item.postsCount}
        title={text.posts}
      />
      <ValueCard
        style={styles.card}
        value={item.following_count}
        title={text.following}
      />
      <ValueCard
        style={[styles.card, styles.lastCard]}
        value={item.followers_count}
        title={text.followers}
      />
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: 20,
      justifyContent: 'space-evenly',
    },
    card: {
      ...whiteCardThemedStyle(colors),
      minWidth: 95,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginRight: 18,
    },
    lastCard: { marginRight: 0 },
  })
)

export default UserCountersBlock
