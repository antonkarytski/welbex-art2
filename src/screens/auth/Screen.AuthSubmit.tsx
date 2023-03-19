import React, { useEffect, useMemo } from 'react'
import QuickAuthUserDataForm from '../../features/auth/quick/QuickAuthUserDataForm'
import { checkIsFieldAbsent } from '../../features/auth/quick/helpers'
import { useQuickAuthNextStep } from '../../features/auth/quick/hooks'
import { setQuickAuthData } from '../../features/auth/quick/model'
import { useThemedStyleList } from '../../features/themed/hooks'
import { links } from '../../navigation/links'
import { ScreenComponentProps } from '../../navigation/types.screenProps'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { inputThemedStyles } from '../../styles/inputs'
import H2 from '../../ui/H2'
import Span from '../../ui/Span'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

const AuthSubmitScreen = ({
  route,
}: ScreenComponentProps<links.authSubmit>) => {
  const { access_token, refresh_token, absent_fields } = route.params
  const { nextStep } = useQuickAuthNextStep(links.authSubmit)
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    buttonPreset: buttonPrimaryThemedPreset,
    field: inputThemedStyles,
  })

  const isUserDataAbsent = useMemo(() => {
    return !!absent_fields.length && checkIsFieldAbsent(absent_fields)
  }, [absent_fields])

  useEffect(() => {
    setQuickAuthData({
      tokens: { access: access_token, refresh: refresh_token },
      absentFields: absent_fields,
    })
    if (!isUserDataAbsent) nextStep()
  }, [refresh_token, access_token, absent_fields, isUserDataAbsent, nextStep])

  if (!isUserDataAbsent) {
    return (
      <AuthScreenContainer>
        <H2 label={'Loading'} style={styles.common.title} />
        <Span>Loading</Span>
      </AuthScreenContainer>
    )
  }

  return (
    <AuthScreenContainer>
      <QuickAuthUserDataForm nextStep={nextStep} />
    </AuthScreenContainer>
  )
}

export default AuthSubmitScreen
