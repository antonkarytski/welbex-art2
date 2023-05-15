import { useStore } from 'effector-react'
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useText } from '../../translations/hook'
import SubscriptionSelectItem, {
  SubscriptionSelectItemProps,
} from '../../ui/lists/SubscriptionSelectItem'
import { useThemedStyleList } from '../themed/hooks'
import { SUBSCRIPTION_PLANS } from './constants'
import {
  getSubscriptionMonthsAmountText,
  getSubscriptionPriceText,
} from './helpers'
import {
  $selectedSubscriptionPlanIndex,
  setSubscriptionPlanIndex,
} from './model'
import {
  subscriptionItemThemedStyles,
  subscriptionSelectedItemThemedStyles,
} from './styles'

type PlanSelectBlockProps = {
  style?: StyleProp<ViewStyle>
}

type SelectItemProps = Omit<SubscriptionSelectItemProps, 'onPress'> & {
  index: number
  activeStyle?: SubscriptionSelectItemProps['style']
  isActive: boolean
}

const SelectItem = React.memo(
  ({ style, activeStyle, index, isActive, ...props }: SelectItemProps) => {
    return (
      <View style={commonStyles.item}>
        <SubscriptionSelectItem
          style={isActive ? activeStyle : style}
          onPress={() => setSubscriptionPlanIndex(index)}
          {...props}
        />
      </View>
    )
  }
)

const PlanSelectBlock = ({ style }: PlanSelectBlockProps) => {
  const selectedItemIndex = useStore($selectedSubscriptionPlanIndex)
  const text = useText()
  const { styles } = useThemedStyleList({
    item: subscriptionItemThemedStyles,
    selectedItem: subscriptionSelectedItemThemedStyles,
  })

  return (
    <View style={[commonStyles.container, style]}>
      {SUBSCRIPTION_PLANS.map(
        ({ monthsAmount, pricePerMonth, promotion }, index) => {
          return (
            <SelectItem
              key={index}
              index={index}
              style={styles.item}
              activeStyle={styles.selectedItem}
              isActive={index === selectedItemIndex}
              value={monthsAmount}
              measure={getSubscriptionMonthsAmountText(monthsAmount, text)}
              price={getSubscriptionPriceText(pricePerMonth, text)}
              promotion={promotion ? `${text.benefit} ${promotion}%` : ''}
            />
          )
        }
      )}
    </View>
  )
}

const commonStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 15,
    paddingHorizontal: 13,
  },
  item: {
    height: 131,
    minWidth: 98,
    maxWidth: 120,
    marginHorizontal: 7,
    flex: 1,
  },
})

export default PlanSelectBlock
