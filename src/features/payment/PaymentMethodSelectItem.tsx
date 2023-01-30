import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import CheckBoxCard from '../../ui/checkbox/CheckBoxCard'
import PaymentMethodItem from './PaymentMethodItem'
import { PaymentMethodDescriptor } from './types'

type PaymentMethodSelectItemProps<I extends PaymentMethodDescriptor> = {
  isSelected: boolean
  onPress: (props: { item: I; nextState: boolean }) => void
  item: I
  style?: ((state: boolean) => StyleProp<ViewStyle>) | StyleProp<ViewStyle>
  checkboxColor?: ((state: boolean) => string) | string
}

const PaymentMethodSelectItem = <I extends PaymentMethodDescriptor>({
  isSelected,
  item,
  style,
  onPress,
  checkboxColor,
}: PaymentMethodSelectItemProps<I>) => {
  return (
    <CheckBoxCard
      checkboxColor={checkboxColor}
      style={style}
      isSelected={isSelected}
      onPress={(nextState) => onPress({ item, nextState })}
    >
      <PaymentMethodItem item={item} />
    </CheckBoxCard>
  )
}

export default PaymentMethodSelectItem
