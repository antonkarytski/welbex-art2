import React from 'react'
import { StyleSheet, View } from 'react-native'
import Span from '../../ui/Span'
import { countryFullName } from './index'
import { UserDescriptionStyles } from './styles'
import { User } from './types'

type UserDescriptionProps = {
  item: User
  style?: UserDescriptionStyles
}

const UserDescription = ({ item, style }: UserDescriptionProps) => {
  return (
    <View style={style?.container}>
      <Span weight={500} style={[styles.name, style?.name]} label={item.name} />
      <Span
        style={[styles.subText, style?.subText]}
        label={`at ${item.age} yo | ${countryFullName(item.country)}`}
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
