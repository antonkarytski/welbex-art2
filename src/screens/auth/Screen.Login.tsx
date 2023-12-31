import React from 'react'
import { StyleSheet } from 'react-native'
import AuthServices from '../../features/auth/AuthServices'
import LogInForm from '../../features/auth/logIn/LogInForm'
import { useThemedStyleList } from '../../features/themed/hooks'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { buttonTextThemedStyles } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import Row from '../../ui/Row'
import Span from '../../ui/Span'
import TextButton from '../../ui/buttons/Button.Text'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

export default function SignUp() {
  const navigate = useNavigate()
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    textButton: buttonTextThemedStyles,
  })

  const onGoToSignUp = () => {
    navigate(links.signUp)
  }

  return (
    <AuthScreenContainer
      style={{ screenWrapper: styles.common.noBottomPadding }}
      enableScrollView
    >
      <LogInForm />
      <AuthServices
        style={[styles.common.bottomButton, screenStyles.authServices]}
      />
      <Row>
        <Span
          label={t.dontHaveAccountQ}
          style={[styles.common.text, screenStyles.dontHaveAccountQ]}
        />
        <TextButton
          label={t.createAccountButton}
          onPress={onGoToSignUp}
          style={styles.textButton}
        />
      </Row>
    </AuthScreenContainer>
  )
}

const screenStyles = StyleSheet.create({
  dontHaveAccountQ: {
    marginRight: 8,
  },
  authServices: {
    marginBottom: 24,
  },
})
