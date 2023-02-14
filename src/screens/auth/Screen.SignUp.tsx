import React from 'react'
import AuthServices from '../../features/auth/AuthServices'
import OfferToLogIn from '../../features/auth/OfferToLogIn'
import UserDataSignUpForm from '../../features/signUp/userData/UserDataSignUpForm'
import { useThemedStyleList } from '../../features/themed/hooks'
import { buttonTextThemedStyles } from '../../styles/buttons'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

const SignUpScreen = () => {
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    textButton: buttonTextThemedStyles,
  })

  return (
    <AuthScreenContainer enableScrollView>
      <UserDataSignUpForm />
      <AuthServices style={styles.common.bottomButton} />
      <OfferToLogIn style={styles.common.noBottomMargin} />
    </AuthScreenContainer>
  )
}

export default SignUpScreen
