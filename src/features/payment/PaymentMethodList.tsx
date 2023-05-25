import { useStore } from 'effector-react'
import React, { useMemo } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { PlanDescriptor } from '../subscription/plans/types'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import AddPaymentCardButton from './AddPaymentCardButton'
import PaymentMethodSelectItem from './PaymentMethodSelectItem'
import { createPaymentMethods } from './helpers'
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
    return createPaymentMethods(paymentCards)
  }, [paymentCards])

  return (
    <>
      <ScrollView style={styles.listContainer}>
        {methods.map((method, index) => {
          return (
            <PaymentMethodSelectItem
              key={index}
              style={(isSelected) => [
                styles.item,
                isSelected && styles.selectedItem,
                index === methods.length - 1 && styles.lastItem,
              ]}
              checkboxColor={(isSelected) => {
                return isSelected ? colors.primary1 : colors.text
              }}
              isSelected={selectedMethod === method}
              onPress={({ item, nextState }) =>
                onSelect(nextState ? item : null)
              }
              item={method}
            />
          )
        })}
      </ScrollView>

      <AddPaymentCardButton
        currentPayment={currentPayment}
        style={[styles.item, styles.addButton]}
        textColor={colors.primary1}
      />
    </>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    item: {
      marginBottom: 20,
      borderColor: colors.darkLine,
    },
    addButton: {
      marginHorizontal: 20,
    },
    selectedItem: {
      borderColor: colors.primary1,
    },
    lastItem: {
      marginBottom: 0,
    },
    listContainer: {
      marginBottom: 20,
      paddingHorizontal: 20,
    },
  })
)

export default PaymentMethodList
