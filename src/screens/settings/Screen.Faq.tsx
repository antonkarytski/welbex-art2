import React from 'react'
import { StyleSheet } from 'react-native'
import FaqList from '../../features/faq/FaqList'
import { useText } from '../../translations/hook'
import SettingScreenContainer from './stylePresets/SettingScreenContainer'

export default function FaqScreen() {
  const t = useText()
  return (
    <SettingScreenContainer
      contentStyle={styles.contentContainer}
      title={t.faq}
    >
      <FaqList />
    </SettingScreenContainer>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 0,
  },
})
