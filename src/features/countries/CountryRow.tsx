import React from 'react'
import { Image, StyleSheet } from 'react-native'
import Row from '../../ui/Row'
import Span from '../../ui/Span'
import { Country } from './types'

type CountryRowProps = {
  item: Country
}

const CountryRow = ({ item }: CountryRowProps) => {
  const { name, nativeName, alpha3Code, flags } = item
  return (
    <Row key={alpha3Code} style={styles.rowWrapper}>
      <Image source={{ uri: flags.png }} style={styles.flag} />
      <Span>{name}</Span>
      {name !== nativeName && (
        <Span style={styles.nativeName}>&#40;{nativeName}&#41;</Span>
      )}
    </Row>
  )
}

const styles = StyleSheet.create({
  rowWrapper: {
    justifyContent: 'flex-start',
  },
  flag: { width: 24, height: 20, marginRight: 12 },
  nativeName: {
    marginLeft: 3,
  },
})

export default CountryRow
