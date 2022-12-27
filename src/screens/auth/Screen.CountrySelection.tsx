import { useStore } from 'effector-react'
import React from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import COUNTRIES from '../../../assets/countries.json'
import { useThemedStyleList } from '../../features/themed/hooks'
import { IS_IOS } from '../../lib/platform'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Row from '../../ui/Row'
import Span from '../../ui/Span'
import PresetButton from '../../ui/buttons/PresetButton'
import Select from '../../ui/select/Select'
import { createSelectModel } from '../../ui/select/model'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

const countryModel = createSelectModel()

const CountrySelectionScreen = () => {
  const navigate = useNavigate()
  const t = useText()
  const [countryId, setCountryId] = useStateStore(countryModel)
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    button: buttonPrimaryThemedPreset,
  })

  const onContinue = () => {
    console.log('countryId', countryId)
    navigate(links.phoneEnter)
  }

  return (
    <AuthScreenContainer>
      <H2 label={t.chooseCountry} style={styles.common.title} />
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={[styles.common.flexGrown]}
      >
        <Select
          label={'country'}
          data={COUNTRIES}
          renderItem={(item) => {
            const { name, nativeName, alpha3Code } = item
            return (
              <Row key={alpha3Code} style={screenStyles.selectItemRow}>
                <Span>{name}</Span>
                {name !== nativeName && <Span>&#40;{nativeName}&#41;</Span>}
              </Row>
            )
          }}
          model={countryModel}
          nameExtractorName={'name'}
          idExtractorName={'alpha3Code'}
        />

        <PresetButton
          label={t.continue}
          onPress={onContinue}
          preset={styles.button}
          style={styles.common.bottomButton}
        />
      </KeyboardAvoidingView>
    </AuthScreenContainer>
  )
}

const screenStyles = StyleSheet.create({
  selectItemRow: {
    justifyContent: 'flex-start',
  },
})

export default CountrySelectionScreen
