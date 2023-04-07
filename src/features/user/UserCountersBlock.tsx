import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { UserCounters } from '../../api/parts/users/types.parts'
import { WINDOW_WIDTH } from '../../lib/device/dimensions'
import { SCREEN_CONTENT_WIDTH } from '../../styles/constants'
import { useText } from '../../translations/hook'
import ValueCard from '../../ui/cards/ValueCard'
import { whiteCardThemedStyle } from '../../ui/cards/styles'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'

type UserCountersBlockProps = {
  item: UserCounters
  style?: StyleProp<ViewStyle>
}

const CARDS_HORIZONTAL_MARGIN = 18
const CARD_WIDTH = (SCREEN_CONTENT_WIDTH - CARDS_HORIZONTAL_MARGIN * 2) / 3

const UserCountersBlock = ({ item, style }: UserCountersBlockProps) => {
  const text = useText()
  const { styles } = useTheme(themedStyles)

  const textStyle = {
    value: styles.cardText,
    label: { ...styles.cardText, ...styles.cardLabel },
  }

  return (
    <View style={[styles.container, style]}>
      <ValueCard
        style={styles.card}
        value={item.posts}
        title={text.posts}
        textStyle={textStyle}
      />
      <ValueCard
        style={styles.card}
        value={item.followings}
        title={text.following}
        textStyle={textStyle}
      />
      <ValueCard
        style={[styles.card, styles.lastCard]}
        value={item.followers}
        title={text.followers}
        textStyle={textStyle}
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
      width: CARD_WIDTH,
      paddingVertical: 12,
      paddingHorizontal: WINDOW_WIDTH <= 375 ? 6 : 12,
      marginRight: CARDS_HORIZONTAL_MARGIN,
      borderRadius: 12,
    },
    lastCard: { marginRight: 0 },
    cardText: {
      color: colors.text,
      textAlign: 'center',
      fontSize: 16,
    },
    cardLabel: {
      fontSize: WINDOW_WIDTH <= 375 ? 12 : 14,
      color: colors.textGrey,
    },
  })
)

export default UserCountersBlock
