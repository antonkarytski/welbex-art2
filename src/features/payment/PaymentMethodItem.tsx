import React from 'react'
import { StyleSheet, View } from 'react-native'
import Span from '../../ui/Span'
import { PaymentMethodDescriptor } from './types'

type PaymentMethodItemProps<I extends PaymentMethodDescriptor> = {
  item: I
}

const PaymentMethodItem = <I extends PaymentMethodDescriptor>({
  item,
}: PaymentMethodItemProps<I>) => {
  return (
    <View style={styles.contentContainer}>
      <item.Icon />
      <Span weight={500} label={item.label} style={styles.label} />
    </View>
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

export default PaymentMethodItem
