import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { SubscriptionSelectItemStyles } from '../../ui/lists/SubscriptionSelectItem'
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

export const subscriptionSelectItemThemedStyles =
  createThemedStyle<SubscriptionSelectItemStyles>((colors) =>
    StyleSheet.create({
      value: {
        color: colors.text,
      },
      measure: {
        color: colors.tipText,
      },
      price: {
        color: colors.buttonPressed,
      },
      promotionCard: {
        backgroundColor: colors.buttonPressed,
      },
      promotionText: {
        color: colors.whiteText,
      },
      container: {
        borderColor: colors.darkLine,
      },
    })
  )

export const subscriptionSelectSelectedItemStyles = createThemedStyle(
  (colors, theme) =>
    StyleSheet.create({
      ...subscriptionSelectItemThemedStyles(theme),
      container: {
        borderColor: colors.buttonPressed,
        backgroundColor: colors.planSelectedBackground,
      },
    })
)
