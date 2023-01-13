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
      container: {
        paddingHorizontal: 34,
      },
      itemText: {
        color: colors.whiteText,
      },
    })
  )

export const subscriptionItemThemedStyles =
  createThemedStyle<SubscriptionSelectItemStyles>((colors) =>
    StyleSheet.create({
      value: {
        color: colors.text,
      },
      measure: {
        color: colors.tipText,
      },
      price: {
        color: colors.primary1,
      },
      promotionCard: {
        backgroundColor: colors.primary1,
      },
      promotionText: {
        color: colors.whiteText,
      },
      container: {
        borderColor: colors.darkLine,
      },
    })
  )

export const subscriptionSelectedItemThemedStyles = createThemedStyle(
  (colors, theme) =>
    StyleSheet.create({
      ...subscriptionItemThemedStyles(theme),
      container: {
        borderColor: colors.primary1,
        backgroundColor: colors.planSelectedBackground,
      },
    })
)

export const subscriptionCurrentItemThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    value: {
      color: colors.primary1,
    },
    measure: {
      color: colors.primary1,
    },
    price: {
      color: colors.primary2,
    },
    container: {
      borderWidth: 0,
      backgroundColor: colors.screenBackground,
    },
  })
)
