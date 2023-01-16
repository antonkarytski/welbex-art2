import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useText } from '../../translations/hook'
import Row from '../../ui/Row'
import Field from '../../ui/form/Field'
import { addCardFormModel } from './model.addCard'

type AddPaymentCardFormProps = {}

const AddPaymentCardForm = ({}: AddPaymentCardFormProps) => {
  const text = useText()

  return (
    <View>
      <View>
        <Field
          label={text.paymentCardNumber}
          placeholder={text.amountOfDigitsOnCardNumber}
          formModel={addCardFormModel}
          name={'number'}
          styles={{}}
        />
      </View>

      <Row style={styles.middleRowContainer}>
        <View style={styles.expirationDateInput}>
          <Field
            label={text.expirationDate}
            placeholder={'mm/yy'}
            formModel={addCardFormModel}
            name={'expirationDate'}
            styles={{}}
          />
        </View>
        <View style={styles.cvcInput}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  middleRowContainer: {
    marginVertical: 20,
  },
  expirationDateInput: {
    flex: 1,
    marginRight: 10,
  },
  cvcInput: {
    flex: 1,
    marginLeft: 10,
  },
})

export default AddPaymentCardForm
