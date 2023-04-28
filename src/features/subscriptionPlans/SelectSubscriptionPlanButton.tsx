import { useStore } from 'effector-react'
import React from 'react'
import { twoDigits } from '../../lib/helpers/numbers'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import PresetButton from '../../ui/buttons/PresetButton'
import { $isAuth } from '../auth/model'
import { useThemedStyleList } from '../themed/hooks'
import { getSubscriptionMonthsAmountText } from './helpers'
import { useSelectedSubscriptionPlan } from './hooks'

const SelectSubscriptionPlanButton = () => {
  const text = useText()
  const navigate = useNavigate()
  const isAuth = useStore($isAuth)
  const selectedPlan = useSelectedSubscriptionPlan()
  const { styles } = useThemedStyleList({ preset: buttonPrimaryThemedPreset })
  const { monthsAmount } = selectedPlan
  const monthsAmountText = getSubscriptionMonthsAmountText(monthsAmount, text)
  const paymentTariffText = `${monthsAmount} ${monthsAmountText} / $${twoDigits(
    selectedPlan.fullPrice
  )}`

  const onPressButton = () => {
    if (!isAuth) return navigate(links.login)
    navigate(links.paymentMethod, { currentPayment: selectedPlan })
  }

  return (
    <PresetButton
      label={`${text.payMonthsButton} ${paymentTariffText}`}
      onPress={onPressButton}
      preset={styles.preset}
    />
  )
}

export default SelectSubscriptionPlanButton
