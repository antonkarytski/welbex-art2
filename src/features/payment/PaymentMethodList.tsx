import { useStore } from 'effector-react'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { PlanDescriptor } from '../subscriptionPlans/types'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import AddPaymentCardButton from './AddPaymentCardButton'
import PaymentMethodSelectItem from './PaymentMethodSelectItem'
import { cardsToPaymentMethods } from './helpers'
import { $paymentCards } from './model'
import { PaymentMethod } from './types'

type PaymentMethodListProps = {
  selectedMethod: PaymentMethod | null
  onSelect: (method: PaymentMethod | null) => void
  currentPayment?: PlanDescriptor
}

const PaymentMethodList = ({
  currentPayment,
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
          <PaymentMethodSelectItem
            key={index}
            style={(isSelected) => [
              styles.item,
              isSelected && styles.selectedItem,
            ]}
            checkboxColor={(isSelected) => {
              return isSelected ? colors.primary1 : colors.text
            }}
            isSelected={selectedMethod === method}
            onPress={({ item, nextState }) => onSelect(nextState ? item : null)}
            item={method}
          />
        )
      })}
      <AddPaymentCardButton
        currentPayment={currentPayment}
        style={styles.item}
        textColor={colors.primary1}
      />
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    item: {
      marginBottom: 20,
      borderColor: colors.darkLine,
    },
    selectedItem: {
      borderColor: colors.primary1,
    },
  })
)

export default PaymentMethodList
