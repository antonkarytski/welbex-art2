import React from 'react'
import AuthServices from '../../features/auth/AuthServices'
import OfferToLogIn from '../../features/auth/OfferToLogIn'
import SignUpForm from '../../features/auth/signUp/SignUpForm'
import { useThemedStyleList } from '../../features/themed/hooks'
import { buttonTextThemedStyles } from '../../styles/buttons'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

const SignUp = () => {
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    textButton: buttonTextThemedStyles,
  })

  return (
    <AuthScreenContainer enableScrollView>
      <SignUpForm />
      <AuthServices style={styles.common.bottomButton} />
      <OfferToLogIn />
    </AuthScreenContainer>
  )
}

export default SignUp
