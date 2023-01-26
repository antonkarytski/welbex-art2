import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import Span from '../../ui/Span'
import PlusIcon from '../../ui/icons/Icon.Plus'
import { PlanDescriptor } from '../subscriptionPlans/types'

type AddPaymentCardButtonProps = {
  style?: StyleProp<ViewStyle>
  textColor?: string
  currentPayment?: PlanDescriptor
}

const AddPaymentCardButton = ({
  style,
  textColor,
  currentPayment,
}: AddPaymentCardButtonProps) => {
  const navigate = useNavigate()
  const text = useText()
  return (
    <TouchableOpacity
      onPress={() => navigate(links.addPaymentCard, { currentPayment })}
      activeOpacity={0.8}
      style={[styles.container, style]}
    >
      <PlusIcon color={textColor} variant={'regular'} />
      <Span
        weight={500}
        style={[styles.label, { color: textColor }]}
        label={text.addCard}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 21.5,
    borderRadius: 12,
  },
  label: {
    fontSize: 16,
    marginLeft: 17,
  },
})

export default AddPaymentCardButton
