import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { IUserProfile, MyProfile } from '../../api/parts/users/types'
import { WINDOW_WIDTH } from '../../lib/device/dimensions'
import { useText } from '../../translations/hook'
import ValueCard from '../../ui/cards/ValueCard'
import { whiteCardThemedStyle } from '../../ui/cards/styles'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'

type UserCountersBlockProps = {
  item: IUserProfile | (MyProfile & { is_followed?: never })
  style?: StyleProp<ViewStyle>
}

const UserCountersBlock = ({ item, style }: UserCountersBlockProps) => {
  const text = useText()
  const { styles } = useTheme(themedStyles)

  const textStyle = {
    value: styles.cardText,
    label: [styles.cardText, styles.cardLabel],
  }

  return (
    <View style={[styles.container, style]}>
      {item.is_child && (
        <ValueCard
          style={styles.card}
          value={item.posts}
          title={text.posts}
          textStyle={textStyle}
        />
      )}
      <ValueCard
        style={styles.card}
        value={item.followings}
        title={text.following}
        textStyle={textStyle}
      />
      {item.is_child && (
        <ValueCard
          style={[styles.card, styles.lastCard]}
          value={item.followers}
          title={text.followers}
          textStyle={textStyle}
        />
      )}
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: 14,
      justifyContent: 'space-between',
    },
    card: {
      ...whiteCardThemedStyle(colors),
      minWidth: 95,
      height: 62,
      flexGrow: 1,
      alignItems: 'center',
      paddingHorizontal: WINDOW_WIDTH <= 375 ? 6 : 12,
      marginHorizontal: 6,
      borderRadius: 12,
    },
    lastCard: { marginRight: 0 },
    cardText: {
      color: colors.text,
      textAlign: 'center',
      fontSize: 16,
      margin: 0,
    },
    cardLabel: {
      fontSize: 14,
      color: colors.textGrey,
    },
  })
)

export default UserCountersBlock
