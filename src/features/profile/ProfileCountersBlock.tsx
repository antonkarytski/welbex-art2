import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useText } from '../../translations/hook'
import ValueCard from '../../ui/cards/ValueCard'
import { whiteCardThemedStyle } from '../../ui/cards/styles'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'

type ProfileCountersBlockProps = {
  style?: StyleProp<ViewStyle>
}

const ProfileCountersBlock = ({ style }: ProfileCountersBlockProps) => {
  const text = useText()
  const { styles } = useTheme(themedStyles)

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: 20,
          justifyContent: 'space-evenly',
        },
        style,
      ]}
    >
      <ValueCard
        style={[styles.card, { marginRight: 18 }]}
        value={15}
        title={text.posts}
      />
      <ValueCard
        style={[styles.card, { marginRight: 18 }]}
        value={200}
        title={text.following}
      />
      <ValueCard style={styles.card} value={200} title={text.followers} />
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    card: {
      ...whiteCardThemedStyle(colors),
      minWidth: 95,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  })
)

export default ProfileCountersBlock
