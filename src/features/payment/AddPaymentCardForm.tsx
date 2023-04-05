import React, { useRef } from 'react'
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
        keyboardType={'numeric'}
        validateOnBlur
        label={text.paymentCardNumber}
        placeholder={text.amountOfDigitsOnCardNumber}
        formModel={addCardFormModel}
        name={addCardFormModel.fields.number}
      />
      <Row style={styles.middleRowContainer}>
        <Field
          validateOnBlur
          label={text.expirationDate}
          placeholder={'mm/yy'}
          keyboardType={'numeric'}
          formModel={addCardFormModel}
          name={addCardFormModel.fields.expirationDate}
          styles={{
            container: styles.expirationDateInput,
          }}
        />
        <Field
          keyboardType={'numeric'}
          validateOnBlur
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
        validateOnBlur
        label={text.nameOnCard}
        placeholder={text.fullName}
        formModel={addCardFormModel}
        name={addCardFormModel.fields.nameOnCard}
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
