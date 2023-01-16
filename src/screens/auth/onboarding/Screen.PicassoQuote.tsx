import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { createThemedStyle } from '../../../features/themed'
import { useThemedStyleList } from '../../../features/themed/hooks'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../../styles/buttons'
import { useText } from '../../../translations/hook'
import Span from '../../../ui/Span'
import PresetButton from '../../../ui/buttons/PresetButton'
import AuthScreenContainer from '../stylePresets/AuthScreenContainer'
import { themedCommonStyles } from '../stylePresets/styles'
import { themedGreetingsStyles } from './styles'

const decorativeImage = require('../../../../assets/images/onboarding_picasso_quote.png')

export default function PicassoQuoteScreen() {
  const t = useText()
  const navigate = useNavigate()
  const { styles } = useThemedStyleList({
    common: themedGreetingsStyles,
    button: buttonPrimaryThemedPreset,
  })

  return (
    <AuthScreenContainer backAvailable={false}>
      <View style={styles.common.imgWrp}>
        <Image source={decorativeImage} style={styles.common.img} />
      </View>
      <Span
        label={t.quoteByPabloPicasso}
        style={styles.common.caption}
        weight={500}
      />
      <Span
        label={t.pabloPicasso}
        style={[styles.common.text, styles.common.subCaptionText]}
        weight={400}
      />
      <PresetButton
        label={t.next}
        onPress={() => {
          navigate(links.onboarding)
        }}
        preset={styles.button}
        style={styles.common.button}
      />
    </AuthScreenContainer>
  )
}
