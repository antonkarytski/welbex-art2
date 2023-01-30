import React from 'react'
import { StyleSheet } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import PaymentCardsList from '../../features/payment/PaymentCardsList'
import { cardToDeleteModel } from '../../features/payment/model'
import DeletePaymentCardPopUp from '../../features/popUp/PopUp.DeletePaymentCard'
import { useThemedStyleList } from '../../features/themed/hooks'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { transparentThemedHeaderStyles } from '../../navigation/elements/styles'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import ScreenContainer from '../../ui/ScreenContainer'
import ScreenWrapper from '../../ui/ScreenWrapper'
import PresetButton from '../../ui/buttons/PresetButton'

const DeletePaymentCardScreen = () => {
  const { colors, styles } = useThemedStyleList({
    header: transparentThemedHeaderStyles,
    buttonPreset: buttonPrimaryThemedPreset,
  })
  const text = useText()
  const [selectedCard, setSelectedCard] = useStateStore(cardToDeleteModel)

  return (
    <ScreenWrapper>
      <ScreenHeader
        backArrowColor={colors.text}
        backAvailable
        style={styles.header}
        title={text.deleteCard}
      />
      <ScreenContainer style={screenStyles.container}>
        <PaymentCardsList
          selectedCard={selectedCard}
          onSelect={setSelectedCard}
        />
        <PresetButton
          label={text.deleteCard}
          onPress={() => {
            DeletePaymentCardPopUp.showSync()
          }}
          preset={styles.buttonPreset}
          style={screenStyles.button}
          disabled={!selectedCard}
        />
      </ScreenContainer>
    </ScreenWrapper>
  )
}

const screenStyles = StyleSheet.create({
  container: {
    paddingTop: 24,
  },
  button: {
    marginTop: 'auto',
  },
})

export default DeletePaymentCardScreen
