import { useStore } from 'effector-react'
import React from 'react'
import { Image, KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import COUNTRIES from '../../../assets/countries.json'
import { useThemedStyleList } from '../../features/themed/hooks'
import { createSearchableListModel } from '../../lib/componentsModels/model.search'
import { createSelectModel } from '../../lib/componentsModels/model.select'
import { IS_IOS } from '../../lib/platform'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Row from '../../ui/Row'
import Span from '../../ui/Span'
import PresetButton from '../../ui/buttons/PresetButton'
import Select from '../../ui/dropdownSelect/DropdownSelect'
import ListSelect from '../../ui/listSelect/ListSelect'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

const countryModel = createSelectModel()

const searchModal = createSearchableListModel({
  filterExtractor: (item) => item.name + ' ' + item.nativeName,
})

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
        {/* ----- TEST -----  */}
        <ListSelect
          data={COUNTRIES}
          idExtractorName={'alpha3Code'}
          searchModel={searchModal}
          selectModel={countryModel}
          renderItem={(item) => {
            const { name, nativeName, alpha3Code, flags } = item
            return (
              <Row key={alpha3Code} style={screenStyles.selectItemRow}>
                <Image source={{ uri: flags.png }} style={screenStyles.flag} />
                <Span>{name}</Span>
                {name !== nativeName && <Span>&#40;{nativeName}&#41;</Span>}
              </Row>
            )
          }}
        />
        {/* ----- TEST -----  */}
        {/* <Select
          data={COUNTRIES}
          idExtractorName={'alpha3Code'}
          // searchableListModel={createSearchableListModel({
          //   filterExtractor: (item) => item.name + ' ' + item.nativeName,
          // })}
          model={countryModel}
          renderItem={(item) => {
            const { name, nativeName, alpha3Code, flags } = item
            return (
              <Row key={alpha3Code} style={screenStyles.selectItemRow}>
                <Image source={{ uri: flags.png }} style={screenStyles.flag} />
                <Span>{name}</Span>
                {name !== nativeName && <Span>&#40;{nativeName}&#41;</Span>}
              </Row>
            )
          }}
        /> */}
        <PresetButton
          label={t.continue}
          onPress={onContinue}
          preset={styles.button}
          style={[styles.common.bottomButton]}
        />
      </KeyboardAvoidingView>
    </AuthScreenContainer>
  )
}

const screenStyles = StyleSheet.create({
  selectItemRow: {
    justifyContent: 'flex-start',
  },
  flag: { width: 24, height: 20, marginRight: 12 },
})

export default CountrySelectionScreen
