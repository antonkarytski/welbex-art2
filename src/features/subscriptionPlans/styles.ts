import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { createThemedStyle } from '../themed'

export type SubscriptionBenefitsBlockStyles = {
  container?: ViewStyle
  itemText?: TextStyle
  item?: ViewStyle
}

export const subscriptionBenefitsBlockThemedStyles =
  createThemedStyle<SubscriptionBenefitsBlockStyles>((colors) =>
    StyleSheet.create({
      itemText: {
        color: colors.whiteText,
      },
    })
  )
