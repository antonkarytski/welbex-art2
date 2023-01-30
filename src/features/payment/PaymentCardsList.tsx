import { useStore } from 'effector-react'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import CheckBoxCard from '../../ui/checkbox/CheckBoxCard'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import PaymentMethodItem from './PaymentMethodItem'
import { bankCardsToPaymentMethods } from './helpers'
import { $paymentCards } from './model'
import { PaymentMethod } from './types'

type PaymentCardsListProps = {
  selectedCard: PaymentMethod | null
  onSelect: (method: PaymentMethod | null) => void
}

const PaymentCardsList = ({
  selectedCard,
  onSelect,
}: PaymentCardsListProps) => {
  const { styles, colors } = useTheme(themedStyles)
  const paymentCards = useStore($paymentCards)
  const paymentCardsToRender = useMemo<PaymentMethod[]>(() => {
    return bankCardsToPaymentMethods(paymentCards)
  }, [paymentCards])

  return (
    <View>
      {paymentCardsToRender.map((card, index) => {
        return (
          <CheckBoxCard
            key={card.number?.toString() || index}
            // checkboxColor={checkboxColor}
            // style={style}
            isSelected={selectedCard === card}
            onPress={(isSelected) => onSelect(isSelected ? card : null)}
            checkboxForm={'square'}
          >
            <PaymentMethodItem item={card} />
          </CheckBoxCard>
        )
      })}
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    // item: {
    //   marginBottom: 20,
    //   borderColor: colors.darkLine,
    // },
    // selectedItem: {
    //   borderColor: colors.primary1,
    // },
  })
)

export default PaymentCardsList
