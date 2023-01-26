import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import Span from '../../ui/Span'
import CheckBoxCard from '../../ui/checkbox/CheckBoxCard'
import { PaymentMethodDescriptor } from './types'

type PaymentMethodSelectItemProps<I extends PaymentMethodDescriptor> = {
  isSelected: boolean
  onPress: (props: { item: I; nextState: boolean }) => void
  item: I
  style?: ((state: boolean) => StyleProp<ViewStyle>) | StyleProp<ViewStyle>
}

const PaymentMethodSelectItem = <I extends PaymentMethodDescriptor>({
  isSelected,
  item,
  style,
  onPress,
}: PaymentMethodSelectItemProps<I>) => {
  return (
    <CheckBoxCard
      style={style}
      isSelected={isSelected}
      onPress={(nextState) => onPress({ item, nextState })}
    >
      <View style={styles.contentContainer}>
        <item.Icon />
        <Span weight={500} label={item.label} style={styles.label} />
      </View>
    </CheckBoxCard>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  label: {
    marginLeft: 14,
  },
})

export default PaymentMethodSelectItem
