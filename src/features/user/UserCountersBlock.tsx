import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { UserCounters } from '../../api/parts/users/types.parts'
import { useText } from '../../translations/hook'
import ValueCard from '../../ui/cards/ValueCard'
import { whiteCardThemedStyle } from '../../ui/cards/styles'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'

type UserCountersBlockProps = {
  item: UserCounters
  style?: StyleProp<ViewStyle>
}

const UserCountersBlock = ({ item, style }: UserCountersBlockProps) => {
  const text = useText()
  const { styles } = useTheme(themedStyles)

  return (
    <View style={[styles.container, style]}>
      <ValueCard
        style={styles.card}
        value={item.posts}
        title={text.posts}
        textStyle={styles.cardText}
      />
      <ValueCard
        style={styles.card}
        value={item.followings}
        title={text.following}
        textStyle={styles.cardText}
      />
      <ValueCard
        style={[styles.card, styles.lastCard]}
        value={item.followers}
        title={text.followers}
        textStyle={styles.cardText}
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
    cardText: {
      color: colors.text,
    },
  })
)

export default UserCountersBlock
