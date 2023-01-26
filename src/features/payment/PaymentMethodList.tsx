import { useStore } from 'effector-react'
import React, { useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import PaymentMethodSelectItem from './PaymentMethodSelectItem'
import { cardsToPaymentMethods } from './helpers'
import { $paymentCards } from './model'
import { PaymentMethod } from './types'

type PaymentMethodListProps = {
  selectedMethod: PaymentMethod | null
  onSelect: (method: PaymentMethod | null) => void
}

const PaymentMethodList = ({
  selectedMethod,
  onSelect,
}: PaymentMethodListProps) => {
  const { styles, colors } = useTheme(themedStyles)
  const paymentCards = useStore($paymentCards)
  const methods = useMemo<PaymentMethod[]>(() => {
    return cardsToPaymentMethods(paymentCards)
  }, [paymentCards])

  return (
    <View>
      {methods.map((method, index) => {
        return (
          <PaymentMethodSelectItem<PaymentMethod>
            key={index}
            style={(isSelected) => [
              styles.item,
              isSelected && styles.selectedItem,
            ]}
            isSelected={selectedMethod === method}
            onPress={({ item, nextState }) => onSelect(nextState ? item : null)}
            item={method}
          />
        )
      })}
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    item: {
      marginBottom: 20,
    },
    selectedItem: {
      borderColor: colors.primary1,
    },
  })
)

export default PaymentMethodList
