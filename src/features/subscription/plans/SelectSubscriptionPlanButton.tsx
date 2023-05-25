import { useStore } from 'effector-react'
import React from 'react'
import { Linking, StyleProp, ViewStyle } from 'react-native'
import { api } from '../../../api'
import { noop } from '../../../lib/helpers'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../../styles/buttons'
import { useText } from '../../../translations/hook'
import PresetButton from '../../../ui/buttons/PresetButton'
import { $isAuth } from '../../auth/model'
import { useThemedStyleList } from '../../themed/hooks'
import { getPlanDescription } from './helpers'
import { useSelectedSubscriptionPlan } from './hooks'

type SelectSubscriptionPlanButtonProps = {
  style?: StyleProp<ViewStyle>
}
const SelectSubscriptionPlanButton = ({
  style,
}: SelectSubscriptionPlanButtonProps) => {
  const text = useText()
  const navigate = useNavigate()
  const isAuth = useStore($isAuth)
  const selectedPlan = useSelectedSubscriptionPlan()
  const { styles } = useThemedStyleList({ preset: buttonPrimaryThemedPreset })

  if (!selectedPlan) return null
  const paymentTariffText = getPlanDescription(selectedPlan, text)

  const onPressButton = () => {
    if (!isAuth) return navigate(links.login)
    api.subscriptions.subscribe(selectedPlan.id).then((e) => {
      Linking.openURL(e.redirect_url).catch(noop)
    })
  }

  return (
    <PresetButton
      style={style}
      label={`${text.payMonthsButton} ${paymentTariffText}`}
      onPress={onPressButton}
      preset={styles.preset}
    />
  )
}

export default SelectSubscriptionPlanButton
