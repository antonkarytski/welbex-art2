import React from 'react'
import { useStateStore } from 'altek-toolkit'
import { useText } from '../../translations/hook'
import { languageModel } from '../../translations/model'
import { Languages } from '../../translations/types'
import ListSelect from '../../ui/selects/ListSelect'
import SettingScreenContainer from './stylePresets/SettingScreenContainer'

export default function LanguageScreen() {
  const [appLanguage, setAppLanguage] = useStateStore(languageModel)
  const t = useText()

  // setAppLanguage(Languages.EN)

  return (
    <SettingScreenContainer title={t.language}>
      {/* <ListSelect /> */}
    </SettingScreenContainer>
  )
}
