import React from 'react'
import { View } from 'react-native'
import AddPaymentCardForm from '../../features/payment/AddPaymentCardForm'
import { addCardFormModel } from '../../features/payment/model.addCard'
import { useThemedStyleList } from '../../features/themed/hooks'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import Row from '../../ui/Row'
import Span from '../../ui/Span'
import PresetButton from '../../ui/buttons/PresetButton'
import Field from '../../ui/form/Field'
import LockIcon from '../../ui/icons/Icon.Lock'

const AddPaymentCardScreen = () => {
  const text = useText()
  const { colors, styles } = useThemedStyleList({
    buttonPreset: buttonPrimaryThemedPreset,
  })

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader
        style={{
          title: {
            color: colors.text,
          },
        }}
        backAvailable
        title={text.addingACard}
      />
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 58,
          height: 'auto',
          flex: 1,
          justifyContent: 'flex-start',
        }}
      >
        <AddPaymentCardForm />
        <View
          style={{
            marginTop: 24,
            flexDirection: 'row',
          }}
        >
          <LockIcon />
          <Span
            label={text.cardInfoSecure}
            style={{
              flex: 1,
              marginLeft: 10,
            }}
          />
        </View>
        <PresetButton
          preset={styles.buttonPreset}
          label={text.addCard}
          onPress={() => {}}
          style={{ marginTop: 'auto' }}
        />
      </View>
    </View>
  )
}

export default AddPaymentCardScreen
