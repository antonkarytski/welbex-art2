import React from 'react'
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { InfoMessageType } from '../../features/infoMessage/types'
import AddPaymentCardForm from '../../features/payment/AddPaymentCardForm'
import PaymentSecuredText from '../../features/payment/PaymentSecuredText'
import { addCardFormModel } from '../../features/payment/model.addCardForm'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { useValidation } from '../../lib/models/form/hooks'
import { useNavigate } from '../../navigation'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { ScreenHeaderStyles } from '../../navigation/elements/styles'
import { links } from '../../navigation/links'
import { ScreenComponentProps } from '../../navigation/types.screenProps'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import PresetButton from '../../ui/buttons/PresetButton'

const AddPaymentCardScreen = ({
  route,
}: ScreenComponentProps<links.addPaymentCard>) => {
  const currentPayment = route.params?.currentPayment
  const text = useText()
  const navigate = useNavigate()
  const { colors, styles } = useThemedStyleList({
    buttonPreset: buttonPrimaryThemedPreset,
    header: headerThemedStyles,
  })
  const isValid = useValidation(addCardFormModel)
  console.log(isValid)

  return (
    <View style={commonStyles.container}>
      <ScreenHeader
        style={styles.header}
        backAvailable
        title={text.addingACard}
        backArrowColor={colors.text}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={commonStyles.contentContainer}>
          <AddPaymentCardForm />
          <PaymentSecuredText style={commonStyles.securityText} />
          <PresetButton
            disabled={isValid === false}
            preset={styles.buttonPreset}
            label={text.addCard}
            onPress={() => {
              addCardFormModel.validation.cast().then((result) => {
                if (!result.isValid) return
                navigate(links.infoMessage, {
                  type: InfoMessageType.CARD_SAVED,
                  payload: { currentPayment },
                })
              })
            }}
            style={commonStyles.button}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const headerThemedStyles = createThemedStyle<ScreenHeaderStyles>((colors) =>
  StyleSheet.create({
    title: {
      color: colors.text,
    },
  })
)

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 58,
    height: 'auto',
    flex: 1,
    justifyContent: 'flex-start',
  },
  securityText: {
    marginTop: 24,
  },
  button: {
    marginTop: 'auto',
  },
})

export default AddPaymentCardScreen
