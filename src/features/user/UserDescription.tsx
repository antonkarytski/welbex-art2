import React from 'react'
import { StyleSheet, View } from 'react-native'
import { UserShort } from '../../api/parts/users/types'
import { getAgeFromBirthday } from '../../lib/helpers/date'
import { createMemoByWeakMap } from '../../lib/helpers/memoization'
import { EN } from '../../translations/languages'
import { LangStructure } from '../../translations/types'
import Span from '../../ui/Span'
import { createThemedStyle } from '../themed'
import { useThemedStyle } from '../themed/hooks'
import { userName, yearsOldToText } from './helpers'
import { countryFullName, countryFullNameClipped } from './index'
import { UserDescriptionStyles } from './styles'

export type AgeTextGenerator = (age: number) => string

type UserDescriptionProps = {
  item: UserShort
  style?: UserDescriptionStyles
  ageTextGenerator?: AgeTextGenerator
  hideSeparator?: boolean
  shortenCountryName?: boolean
  shortenUserName?: boolean
}

export const localeAgeTextShort = createMemoByWeakMap((text: LangStructure) => {
  return (age?: number) =>
    age ? `${text.atAge} ${age} ${yearsOldToText(age, text, true)}` : ''
})

export const localeAgeTextFull = createMemoByWeakMap((text: LangStructure) => {
  return (age?: number) => (age ? `${age} ${yearsOldToText(age, text)}` : '')
})

const UserDescription = ({
  item,
  style,
  ageTextGenerator = localeAgeTextShort(EN),
  hideSeparator,
  shortenCountryName,
  shortenUserName,
}: UserDescriptionProps) => {
  const age = item.age || (item.DOB ? getAgeFromBirthday(item.DOB) : null)
  const styles = useThemedStyle(themedStyles)

  const parts: string[] = []
  if (age) parts.push(ageTextGenerator(age))
  parts.push(
    shortenCountryName
      ? countryFullNameClipped(item.country)
      : countryFullName(item.country)
  )

  return (
    <View style={style?.container}>
      <Span
        weight={500}
        style={[styles.name, style?.name]}
        label={userName(item, !!shortenUserName)}
        adjustsFontSizeToFit
        minimumFontScale={0.8}
        numberOfLines={2}
      />
      <Span
        style={[styles.subText, style?.subText]}
        label={parts.join(hideSeparator ? ' ' : ' | ')}
      />
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    name: {
      fontSize: 16,
      lineHeight: 21,
      color: colors.text,
    },
    subText: {
      fontSize: 14,
      lineHeight: 21,
    },
  })
)

export default UserDescription
