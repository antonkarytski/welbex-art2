import React from 'react'
import { StyleSheet, View } from 'react-native'
import AddPaymentCardForm from '../../features/payment/AddPaymentCardForm'
import PaymentSecuredText from '../../features/payment/PaymentSecuredText'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { ScreenHeaderStyles } from '../../navigation/elements/styles'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import PresetButton from '../../ui/buttons/PresetButton'

const AddPaymentCardScreen = () => {
  const text = useText()
  const { styles } = useThemedStyleList({
    buttonPreset: buttonPrimaryThemedPreset,
    header: headerThemedStyles,
  })

  return (
    <View style={commonStyles.container}>
      <ScreenHeader
        style={styles.header}
        backAvailable
        title={text.addingACard}
      />
      <View style={commonStyles.contentContainer}>
        <AddPaymentCardForm />
        <PaymentSecuredText style={commonStyles.securityText} />
        <PresetButton
          preset={styles.buttonPreset}
          label={text.addCard}
          onPress={() => {}}
          style={commonStyles.button}
        />
      </View>
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
