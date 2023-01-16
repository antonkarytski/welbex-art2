import React from 'react'
import { View } from 'react-native'
import { useThemedStyleList } from '../../features/themed/hooks'
import { createFormModel } from '../../lib/componentsModels/model.form'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { useText } from '../../translations/hook'
import Row from '../../ui/Row'
import Span from '../../ui/Span'
import Field from '../../ui/form/Field'

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
  const { colors } = useThemedStyleList({})

  return (
    <View>
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
        }}
      >
        <Field
          label={text.paymentCardNumber}
          placeholder={text.amountOfDigitsOnCardNumber}
          formModel={addCardFormModel}
          name={'number'}
          styles={{}}
        />
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
        <Field
          label={text.nameOnCard}
          placeholder={text.fullName}
          formModel={addCardFormModel}
          name={'nameOnCard'}
          styles={{}}
        />
        <Span label={text.cardInfoSecure} />
      </View>
    </View>
  )
}

export default AddPaymentCardScreen
