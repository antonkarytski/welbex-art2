import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import {
  buttonPrimaryThemedPreset,
  buttonTextThemedStyles,
} from '../../styles/buttons'
import { useText } from '../../translations/hook'
import Span from '../../ui/Span'
import PresetButton from '../../ui/buttons/PresetButton'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import OfferToLogIn from './OfferToLogIn'

type OfferToGetAuthorizationProps = {
  style?: StyleProp<ViewStyle>
  enableDescriptionText?: boolean
}

const OfferToGetAuthorization = ({
  style,
  enableDescriptionText,
}: OfferToGetAuthorizationProps) => {
  const t = useText()
  const navigate = useNavigate()
  const { styles } = useThemedStyleList({
    textButton: buttonTextThemedStyles,
    presetButton: buttonPrimaryThemedPreset,
    feature: featureStyles,
  })

  return (
    <View style={style}>
      {enableDescriptionText && (
        <Span
          label={t.loginToAccountOrRegister}
          weight={500}
          style={styles.feature.description}
        />
      )}
      <PresetButton
        label={t.createNewAccount}
        onPress={() => navigate(links.signUp)}
        preset={styles.presetButton}
      />
      <OfferToLogIn />
    </View>
  )
}

const featureStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    description: {
      color: colors.text,
      fontSize: 16,
      lineHeight: 21,
      marginBottom: 40,
      textAlign: 'center',
    },
  })
)

export default OfferToGetAuthorization
