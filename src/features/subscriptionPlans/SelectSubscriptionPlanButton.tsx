import React from 'react'
import { twoDigits } from '../../lib/helpers/numbers'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import PresetButton from '../../ui/buttons/PresetButton'
import { useThemedStyleList } from '../themed/hooks'
import { useSelectedSubscriptionPlan } from './hooks'

const SelectSubscriptionPlanButton = () => {
  const text = useText()
  const selectedPlan = useSelectedSubscriptionPlan()
  const { styles } = useThemedStyleList({ preset: buttonPrimaryThemedPreset })

  return (
    <PresetButton
      label={`${text.get} ${selectedPlan.monthsAmount} ${
        text.months
      } / ${twoDigits(selectedPlan.fullPrice)}`}
      onPress={() => {}}
      preset={styles.preset}
    />
  )
}

export default SelectSubscriptionPlanButton
