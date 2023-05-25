import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { useText } from '../../../translations/hook'
import Span from '../../../ui/Span'
import RefreshIcon from '../../../ui/icons/Icon.Refresh'
import { currentSubscriptionControllersStyles } from './styles'

type ChangeSubscriptionButtonProps = {
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  iconColor?: string
}

const ChangeTariffButton = ({
  style,
  textStyle,
  iconColor,
}: ChangeSubscriptionButtonProps) => {
  const navigate = useNavigate()
  const text = useText()

  return (
    <TouchableOpacity
      onPress={() => navigate(links.subscriptionSelectPlan)}
      style={[
        currentSubscriptionControllersStyles.item,
        styles.container,
        style,
      ]}
    >
      <RefreshIcon color={iconColor} />
      <Span
        weight={500}
        style={[styles.text, textStyle]}
        label={text.changeTariff}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 15,
  },
})

export default ChangeTariffButton
