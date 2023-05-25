import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { noop } from '../../../lib/helpers'
import { useText } from '../../../translations/hook'
import { LangStructure } from '../../../translations/types'
import SubscriptionSelectItem, {
  SubscriptionSelectItemProps,
  SubscriptionSelectItemStyles,
} from '../../../ui/lists/SubscriptionSelectItem'
import { useThemedStyleList } from '../../themed/hooks'
import {
  getSubscriptionMonthsAmountText,
  getSubscriptionPriceText,
} from './helpers'
import { loadPlans, selectedSubscriptionPlan, subscriptionPlans } from './model'
import {
  subscriptionItemThemedStyles,
  subscriptionSelectedItemThemedStyles,
} from './styles'
import { PlanDescriptor } from './types'

type PlanSelectBlockProps = {
  style?: StyleProp<ViewStyle>
}

type SelectItemProps = {
  style?: SubscriptionSelectItemStyles
  activeStyle?: SubscriptionSelectItemProps['style']
  isActive: boolean
  item: PlanDescriptor
  text: LangStructure
}

const SelectItem = React.memo(
  ({ style, activeStyle, isActive, item, text }: SelectItemProps) => {
    return (
      <View style={commonStyles.item}>
        <SubscriptionSelectItem
          style={isActive ? activeStyle : style}
          onPress={() => selectedSubscriptionPlan.set(item)}
          value={item.duration}
          measure={getSubscriptionMonthsAmountText(item.duration, text)}
          price={getSubscriptionPriceText(item.price, item.currency, text)}
          promotion={item.promotion ? `${text.benefit} ${item.promotion}%` : ''}
        />
      </View>
    )
  }
)

const PlanSelectBlock = ({ style }: PlanSelectBlockProps) => {
  const selectedItem = useStore(selectedSubscriptionPlan.$state)
  const plans = useStore(subscriptionPlans.$state)
  const text = useText()
  const { styles } = useThemedStyleList({
    item: subscriptionItemThemedStyles,
    selectedItem: subscriptionSelectedItemThemedStyles,
  })

  useEffect(() => {
    loadPlans().catch(noop)
  }, [])

  if (!plans) return null
  return (
    <View style={[commonStyles.container, style]}>
      {plans.map((plan, index) => {
        return (
          <SelectItem
            key={index}
            style={styles.item}
            activeStyle={styles.selectedItem}
            isActive={plan === selectedItem}
            item={plan}
            text={text}
          />
        )
      })}
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
