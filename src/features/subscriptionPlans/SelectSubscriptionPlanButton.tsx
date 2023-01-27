import React from 'react'
import { twoDigits } from '../../lib/helpers/numbers'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import PresetButton from '../../ui/buttons/PresetButton'
import { useThemedStyleList } from '../themed/hooks'
import { useSelectedSubscriptionPlan } from './hooks'

const SelectSubscriptionPlanButton = () => {
  const text = useText()
  const navigate = useNavigate()
  const selectedPlan = useSelectedSubscriptionPlan()
  const { styles } = useThemedStyleList({ preset: buttonPrimaryThemedPreset })

  return (
    <PresetButton
      label={`${text.get} ${selectedPlan.monthsAmount} ${
        text.months
      } / ${twoDigits(selectedPlan.fullPrice)}`}
      onPress={() =>
        navigate(links.paymentMethod, { currentPayment: selectedPlan })
      }
      preset={styles.preset}
    />
  )
}

export default SelectSubscriptionPlanButton
