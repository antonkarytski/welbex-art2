import React from 'react'
import { StyleSheet } from 'react-native'
import AuthWithServices from '../../features/signUp/AuthWithServices'
import SignUpForm from '../../features/signUp/SignUpForm'
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

  const onGoToLogIn = () => {
    navigate(links.login)
  }

  return (
    <ScreenWrapper style={styles.common.screenWrapper}>
      <AppHeader style={styles.screenHeader} />
      <SignUpForm />
      <AuthWithServices />
      <FlexRow>
        <Span style={[styles.common.text, screenStyles.haveAccountQ]}>
          {t.haveAccountQ}
        </Span>
        <TextButton
          label={t.logIn}
          onPress={onGoToLogIn}
          styleLabel={styles.common.textAccent}
        />
      </FlexRow>
    </ScreenWrapper>
  )
}

const screenStyles = StyleSheet.create({
  haveAccountQ: {
    marginRight: 8,
  },
})
