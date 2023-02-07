import React from 'react'
import { Image, ImageStyle, View } from 'react-native'
import { useThemedStyleList } from '../../../features/themed/hooks'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../../styles/buttons'
import { useText } from '../../../translations/hook'
import Span from '../../../ui/Span'
import PresetButton from '../../../ui/buttons/PresetButton'
import AuthScreenContainer from '../stylePresets/AuthScreenContainer'
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
    <AuthScreenContainer backAvailable={false} enableScrollView>
      <View style={styles.common.imgWrp}>
        <Image
          source={decorativeImage}
          style={styles.common.img as ImageStyle}
        />
      </View>
      <Span
        label={t.quoteByPabloPicasso}
        style={styles.common.caption}
        weight={500}
      />
      <Span
        label={t.pabloPicasso}
        style={[
          styles.common.text,
          styles.common.subCaptionText,
          styles.common.marginBottom,
        ]}
        weight={400}
      />
      <PresetButton
        label={t.next}
        onPress={() => {
          navigate(links.onboarding)
        }}
        preset={styles.button}
        style={[styles.common.button, styles.common.buttonNext]}
      />
    </AuthScreenContainer>
  )
}
