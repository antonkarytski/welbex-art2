import { useStore } from 'effector-react'
import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { checkboxThemedPreset } from '../../styles/checkbox'
import CheckBoxCard from '../../ui/checkbox/CheckBoxCard'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import PaymentMethodItem from './PaymentMethodItem'
import { bankCardsToPaymentMethods } from './helpers'
import { $paymentCards } from './model'
import { CardPaymentMethod } from './types'

type PaymentCardsListProps = {
  selectedCard: CardPaymentMethod | null
  onSelect: (method: CardPaymentMethod | null) => void
}

const PaymentCardsList = ({
  selectedCard,
  onSelect,
}: PaymentCardsListProps) => {
  const { styles } = useThemedStyleList({
    common: themedStyles,
    checkbox: checkboxThemedPreset,
  })
  const paymentCards = useStore($paymentCards)
  const paymentCardsToRender = useMemo<CardPaymentMethod[]>(() => {
    return bankCardsToPaymentMethods(paymentCards)
  }, [paymentCards])

  return (
    <>
      {paymentCardsToRender.map((card, index) => {
        return (
          <CheckBoxCard
            key={card.number?.toString() || index}
            style={[
              styles.common.checkboxCard,
              index === paymentCardsToRender.length - 1 &&
                styles.common.lastCard,
            ]}
            checkboxPreset={styles.checkbox}
            isSelected={selectedCard === card}
            onPress={(isSelected) => onSelect(isSelected ? card : null)}
            checkboxForm={'square'}
          >
            <PaymentMethodItem item={card} />
          </CheckBoxCard>
        )
      })}
    </>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    checkboxCard: {
      marginBottom: 20,
      borderColor: colors.inputBorder,
    },
    lastCard: {
      marginBottom: 0,
    },
  })
)

export default PaymentCardsList
