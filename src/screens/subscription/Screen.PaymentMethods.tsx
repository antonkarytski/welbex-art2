import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { InfoMessageType } from '../../features/infoMessage/types'
import PaymentMethodList from '../../features/payment/PaymentMethodList'
import { PaymentMethod } from '../../features/payment/types'
import { useThemedStyleList } from '../../features/themed/hooks'
import { twoDigits } from '../../lib/helpers/numbers'
import { useNavigate } from '../../navigation'
import DeleteNavigationButton from '../../navigation/elements/NavigationButton.Delete'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { transparentThemedHeaderStyles } from '../../navigation/elements/styles'
import { links } from '../../navigation/links'
import { ScreenComponentProps } from '../../navigation/types.screenProps'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import PresetButton from '../../ui/buttons/PresetButton'

const PaymentMethodsScreen = ({
  route,
}: ScreenComponentProps<links.paymentMethod>) => {
  const navigate = useNavigate()
  const paymentPlan = route.params?.currentPayment
  const { colors, styles } = useThemedStyleList({
    header: transparentThemedHeaderStyles,
    buttonPreset: buttonPrimaryThemedPreset,
  })
  const text = useText()

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null
  )

  return (
    <View style={commonStyles.container}>
      <ScreenHeader
        backArrowColor={colors.text}
        backAvailable
        style={styles.header}
        title={text.paymentMethod}
        headerRight={
          <DeleteNavigationButton
            navigateTo={links.deletePaymentCard}
            iconColor={colors.appHeaderIconDark}
          />
        }
      />
      <View style={commonStyles.contentContainer}>
        <PaymentMethodList
          selectedMethod={selectedMethod}
          onSelect={setSelectedMethod}
          currentPayment={paymentPlan}
        />
        {!!paymentPlan && (
          <PresetButton
            disabled={!selectedMethod}
            style={commonStyles.button}
            label={`${text.pay} $${twoDigits(paymentPlan.fullPrice)}`}
            onPress={() =>
              navigate(links.infoMessage, {
                type: InfoMessageType.SUCCESSFUL_PAYMENT,
                payload: { currentPayment: paymentPlan },
              })
            }
            preset={styles.buttonPreset}
          />
        )}
      </View>
    </View>
  )
}

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    flex: 1,
  },
  button: {
    marginTop: 'auto',
    marginBottom: 58,
  },
})

export default PaymentMethodsScreen
