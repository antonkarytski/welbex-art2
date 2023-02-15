import React from 'react'
import { StyleSheet, View } from 'react-native'
import { UserShort } from '../../api/parts/users/types'
import { createMemoByWeakMap } from '../../lib/helpers/memoization'
import { EN } from '../../translations/languages'
import { LangStructure } from '../../translations/types'
import Span from '../../ui/Span'
import { userName } from './helpers'
import { countryFullName, countryFullNameClipped } from './index'
import { UserDescriptionStyles } from './styles'

export type AgeTextGenerator = (age: number) => string

type UserDescriptionProps = {
  item: Omit<UserShort, 'is_followed'>
  style?: UserDescriptionStyles
  ageTextGenerator?: AgeTextGenerator
  hideSeparator?: boolean
  shortenCountryName?: boolean
}

export const localeAgeTextShort = createMemoByWeakMap((text: LangStructure) => {
  return (age: number) => `${text.atAge} ${age} ${text.yearsOldAbbreviated}`
})
export const localeAgeTextFull = createMemoByWeakMap((text: LangStructure) => {
  return (age: number) => `${age} ${text.yearsOld}`
})

const UserDescription = ({
  item,
  style,
  ageTextGenerator = localeAgeTextShort(EN),
  hideSeparator,
  shortenCountryName,
}: UserDescriptionProps) => {
  const ageText = ageTextGenerator(item.age)

  return (
    <View style={style?.container}>
      <Span
        weight={500}
        style={[styles.name, style?.name]}
        label={userName(item)}
      />
      <Span
        style={[styles.subText, style?.subText]}
        label={`${ageText} ${hideSeparator ? ' ' : '|'} ${
          shortenCountryName
            ? countryFullNameClipped(item.country)
            : countryFullName(item.country)
        }`}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  name: {
    fontSize: 16,
    lineHeight: 21,
  },
  subText: {
    fontSize: 14,
    lineHeight: 21,
  },
})

export default UserDescription
