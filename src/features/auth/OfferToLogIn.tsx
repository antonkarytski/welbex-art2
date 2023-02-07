import React from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { buttonTextThemedStyles } from '../../styles/buttons'
import { FONT_MEDIUM } from '../../styles/fonts'
import { useText } from '../../translations/hook'
import Row from '../../ui/Row'
import Span from '../../ui/Span'
import TextButton from '../../ui/buttons/Button.Text'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'

type OfferToLoginProps = {
  style?: StyleProp<ViewStyle>
}

const OfferToLogin = ({ style }: OfferToLoginProps) => {
  const t = useText()
  const navigate = useNavigate()
  const { styles } = useThemedStyleList({
    feature: themedStyles,
    textButton: buttonTextThemedStyles,
  })

  return (
    <Row style={[styles.feature.row, style]}>
      <Span label={t.haveAccountQ} style={[styles.feature.text]} />
      <TextButton
        label={t.logIn}
        onPress={() => navigate(links.login)}
        style={styles.textButton}
      />
    </Row>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    text: {
      marginRight: 8,
      fontSize: 14,
      lineHeight: 17,
      fontFamily: FONT_MEDIUM,
      color: colors.text,
    },
    row: {
      marginVertical: 24,
    },
  })
)

export default OfferToLogin
