import { useStore } from 'effector-react'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useText } from '../../translations/hook'
import SubscriptionSelectItem from '../../ui/lists/SubscriptionSelectItem'
import { useThemedStyleList } from '../themed/hooks'
import {
  $selectedSubscriptionPlanIndex,
  SUBSCRIPTION_PLANS,
  setSubscriptionPlanIndex,
} from './model'
import {
  subscriptionSelectItemThemedStyles,
  subscriptionSelectSelectedItemStyles,
} from './styles'

type PlanSelectBlockProps = {}

const PlanSelectBlock = ({}: PlanSelectBlockProps) => {
  const selectedItemIndex = useStore($selectedSubscriptionPlanIndex)
  const text = useText()
  const { styles } = useThemedStyleList({
    item: subscriptionSelectItemThemedStyles,
    selectedItem: subscriptionSelectSelectedItemStyles,
  })

  return (
    <View style={commonStyles.container}>
      {SUBSCRIPTION_PLANS.map(
        ({ monthsAmount, pricePerMonth, promotion }, index) => {
          return (
            <SubscriptionSelectItem
              index={index}
              key={index}
              style={
                index === selectedItemIndex ? styles.selectedItem : styles.item
              }
              value={monthsAmount}
              measure={text.months}
              price={`$ ${pricePerMonth} / ${text.month}`}
              promotion={promotion ? `${text.save} ${promotion} %` : ''}
              onPress={setSubscriptionPlanIndex}
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
  },
})

export default PlanSelectBlock
