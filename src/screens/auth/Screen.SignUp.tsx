import React from 'react'
import { StyleSheet } from 'react-native'
import AuthServices from '../../features/authServices/AuthServices'
import SignUpForm from '../../features/signUp/SignUpForm'
import { useThemedStyleList } from '../../features/themed/hooks'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import Row from '../../ui/Row'
import Span from '../../ui/Span'
import TextButton from '../../ui/buttons/Button.Text'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import {
  themedCommonStyles,
  themedTextButtonStyles,
} from './stylePresets/styles'

const SignUp = () => {
  const navigate = useNavigate()
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    textButton: themedTextButtonStyles,
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
          styles={styles.textButton}
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
