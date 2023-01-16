import React from 'react'
import { View } from 'react-native'
import { useThemedStyleList } from '../../features/themed/hooks'
import { createFormModel } from '../../lib/componentsModels/model.form'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import Row from '../../ui/Row'
import Span from '../../ui/Span'
import PresetButton from '../../ui/buttons/PresetButton'
import Field from '../../ui/form/Field'
import LockIcon from '../../ui/icons/Icon.Lock'

type AddCardForm = {
  number: string
  expirationDate: string
  cvc: string
  nameOnCard: string
}

const initialAddCardForm: AddCardForm = {
  number: '',
  expirationDate: '',
  cvc: '',
  nameOnCard: '',
}

const addCardFormModel = createFormModel(initialAddCardForm)

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
        <View>
          <Field
            label={text.paymentCardNumber}
            placeholder={text.amountOfDigitsOnCardNumber}
            formModel={addCardFormModel}
            name={'number'}
            styles={{}}
          />
        </View>

        <Row style={{ marginVertical: 20 }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Field
              label={text.expirationDate}
              placeholder={'mm/yy'}
              formModel={addCardFormModel}
              name={'expirationDate'}
              styles={{}}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Field
              label={text.cvc}
              placeholder={`3 ${text.numbers}`}
              formModel={addCardFormModel}
              name={'cvc'}
              styles={{}}
            />
          </View>
        </Row>
        <View>
          <Field
            label={text.nameOnCard}
            placeholder={text.fullName}
            formModel={addCardFormModel}
            name={'nameOnCard'}
            styles={{}}
          />
        </View>

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
