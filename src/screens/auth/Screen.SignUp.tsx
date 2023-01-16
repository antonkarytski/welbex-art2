import React from 'react'
import { StyleSheet } from 'react-native'
import AuthServices from '../../features/auth/AuthServices'
import SignUpForm from '../../features/auth/signUp/SignUpForm'
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

const SignUp = () => {
  const navigate = useNavigate()
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    textButton: buttonTextThemedStyles,
  })

  const onGoToLogIn = () => {
    navigate(links.login)
  }

  return (
    <AuthScreenContainer>
      <SignUpForm />
      <AuthServices />
      <Row>
        <Span
          label={t.haveAccountQ}
          style={[styles.common.text, screenStyles.haveAccountQ]}
        />
        <TextButton
          label={t.logIn}
          onPress={onGoToLogIn}
          style={styles.textButton}
        />
      </Row>
    </AuthScreenContainer>
  )
}

const screenStyles = StyleSheet.create({
  haveAccountQ: {
    marginRight: 8,
  },
})

export default SignUp
