import { bool } from 'yup'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createMemoByWeakMap } from '../../lib/helpers/memoization'
import { EN } from '../../translations/languages'
import { LangStructure } from '../../translations/types'
import Span from '../../ui/Span'
import { countryFullName } from './index'
import { UserDescriptionStyles } from './styles'
import { User } from './types'

export type AgeTextGenerator = (age: number) => string

type UserDescriptionProps = {
  item: User
  style?: UserDescriptionStyles
  ageTextGenerator?: AgeTextGenerator
  hideSeparator?: boolean
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
}: UserDescriptionProps) => {
  const ageText = ageTextGenerator(item.age)

  return (
    <View style={style?.container}>
      <Span weight={500} style={[styles.name, style?.name]} label={item.name} />
      <Span
        style={[styles.subText, style?.subText]}
        label={`${ageText} ${hideSeparator ? ' ' : '|'} ${countryFullName(
          item.country
        )}`}
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
