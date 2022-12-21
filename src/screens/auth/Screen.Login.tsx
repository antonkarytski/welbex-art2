import React from 'react'
import { StyleSheet } from 'react-native'
import LogInForm from '../../features/logIn/LogInForm'
import AuthWithServices from '../../features/signUp/AuthWithServices'
import { useThemedStyleList } from '../../features/themed/hooks'
import { useNavigate } from '../../navigation'
import AppHeader from '../../navigation/elements/AppHeader'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import FlexRow from '../../ui/FlexRow'
import ScreenWrapper from '../../ui/ScreenWrapper'
import Span from '../../ui/Span'
import TextButton from '../../ui/buttons/Button.Text'
import { themedCommonStyles, themedScreenHeaderStyles } from './styles'

export default function SignUp() {
  const navigate = useNavigate()
  const t = useText()
  const { styles } = useThemedStyleList({
    screenHeader: themedScreenHeaderStyles,
    common: themedCommonStyles,
  })

  const onGoToSignUp = () => {
    navigate(links.signUp)
  }

  return (
    <ScreenWrapper style={styles.common.screenWrapper}>
      <AppHeader style={styles.screenHeader} />
      <LogInForm />
      <AuthWithServices />
      <FlexRow>
        <Span style={[styles.common.text, screenStyles.dontHaveAccountQ]}>
          {t.dontHaveAccountQ}
        </Span>
        <TextButton
          label={t.createAccountButton}
          onPress={onGoToSignUp}
          styleLabel={styles.common.textAccent}
        />
      </FlexRow>
    </ScreenWrapper>
  )
}

const screenStyles = StyleSheet.create({
  dontHaveAccountQ: {
    marginRight: 8,
  },
})
