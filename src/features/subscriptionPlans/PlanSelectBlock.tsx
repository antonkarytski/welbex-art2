import { useStore } from 'effector-react'
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useText } from '../../translations/hook'
import SubscriptionSelectItem, {
  SubscriptionSelectItemProps,
} from '../../ui/lists/SubscriptionSelectItem'
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
      <SubscriptionSelectItem
        style={isActive ? activeStyle : style}
        onPress={() => setSubscriptionPlanIndex(index)}
        {...props}
      />
    )
  }
)

const PlanSelectBlock = ({ style }: PlanSelectBlockProps) => {
  const selectedItemIndex = useStore($selectedSubscriptionPlanIndex)
  const text = useText()
  const { styles } = useThemedStyleList({
    item: subscriptionSelectItemThemedStyles,
    selectedItem: subscriptionSelectSelectedItemStyles,
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
              measure={text.months}
              price={`$ ${pricePerMonth} / ${text.month}`}
              promotion={promotion ? `${text.save} ${promotion} %` : ''}
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
