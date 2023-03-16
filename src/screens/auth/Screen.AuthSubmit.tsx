import { useStore } from 'effector-react'
import React, { useCallback, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import {
  quickAuthFormModel,
  saveFormToCompleteData,
  setQuickAuthToken,
} from '../../features/auth/quick/model'
import { completeQuickAuth } from '../../features/auth/quick/request'
import { useThemedStyleList } from '../../features/themed/hooks'
import { noop } from '../../lib/helpers'
import { Tokens } from '../../lib/models/apiBuilder/types.token'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { ScreenComponentProps } from '../../navigation/types.screenProps'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { inputThemedStyles } from '../../styles/inputs'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Span from '../../ui/Span'
import PresetButton from '../../ui/buttons/PresetButton'
import DateField from '../../ui/form/DateField'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

const AuthSubmitScreen = ({
  route,
}: ScreenComponentProps<links.authSubmit>) => {
  const { has_date_of_birth, access_token, has_phone_number, refresh_token } =
    route.params
  const t = useText()
  const navigate = useNavigate()
  const isValid = useStore(quickAuthFormModel.validation.$state)
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    buttonPreset: buttonPrimaryThemedPreset,
    field: inputThemedStyles,
  })

  const nextStep = useCallback(() => {
    const tokens: Tokens = { access: access_token, refresh: refresh_token }
    if (!has_phone_number) {
      setQuickAuthToken(tokens)
      return navigate(links.phoneEnter)
    }
    completeQuickAuth().catch(noop)
  }, [access_token, refresh_token, has_phone_number, navigate])

  useEffect(() => {
    if (has_date_of_birth) nextStep()
  }, [has_date_of_birth, nextStep])

  if (has_phone_number || has_date_of_birth) {
    return (
      <AuthScreenContainer>
        <H2 label={'Loading'} style={styles.common.title} />
        <Span>Loading</Span>
      </AuthScreenContainer>
    )
  }

  return (
    <AuthScreenContainer>
      <H2 label={t.completeRegistration} style={styles.common.title} />
      <DateField
        placeholder={t.birthDate}
        formModel={quickAuthFormModel}
        name={quickAuthFormModel.fields.birthDate}
        style={styles.field}
        validateOnBlur
      />
      )
      <PresetButton
        label={t.send}
        onPress={async () => {
          try {
            if (!has_date_of_birth) {
              const result = await quickAuthFormModel.validation.cast()
              if (!result.list.birthDate) return
              saveFormToCompleteData({ DOB: true })
            }
            nextStep()
          } catch {}
        }}
        preset={styles.buttonPreset}
        style={commonStyles.button}
        disabled={has_date_of_birth && isValid === false}
      />
    </AuthScreenContainer>
  )
}

const commonStyles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  title: {
    marginBottom: 40,
  },
})

export default AuthSubmitScreen
