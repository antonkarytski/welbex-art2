import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useText } from '../../translations/hook'
import Row from '../../ui/Row'
import Field from '../../ui/form/Field'
import { addCardFormModel } from './model.addCardForm'

type AddPaymentCardFormProps = {}

const AddPaymentCardForm = ({}: AddPaymentCardFormProps) => {
  const text = useText()

  return (
    <View>
      <Field
        label={text.paymentCardNumber}
        placeholder={text.amountOfDigitsOnCardNumber}
        formModel={addCardFormModel}
        name={addCardFormModel.fields.number}
        styles={{}}
      />
      <Row style={styles.middleRowContainer}>
        <Field
          label={text.expirationDate}
          placeholder={'mm/yy'}
          formModel={addCardFormModel}
          name={addCardFormModel.fields.expirationDate}
          styles={{
            container: styles.expirationDateInput,
          }}
        />
        <Field
          label={text.cvc}
          placeholder={`3 ${text.numbers}`}
          formModel={addCardFormModel}
          name={addCardFormModel.fields.cvc}
          styles={{
            container: styles.cvcInput,
          }}
        />
      </Row>
      <Field
        label={text.nameOnCard}
        placeholder={text.fullName}
        formModel={addCardFormModel}
        name={addCardFormModel.fields.nameOnCard}
        styles={{}}
      />
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
