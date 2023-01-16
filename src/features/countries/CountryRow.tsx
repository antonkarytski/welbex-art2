import React from 'react'
import { StyleSheet } from 'react-native'
import Row from '../../ui/Row'
import Span from '../../ui/Span'
import { Country } from './types'

type CountryRowProps = {
  item: Country
}

const CountryRow = React.memo(
  ({ item }: CountryRowProps) => {
    const { name, nativeName, emoji } = item
    return (
      <Row style={styles.rowWrapper}>
        <Span style={styles.flagEmoji}>{emoji}</Span>
        <Row style={styles.nameRow}>
          <Span>{name}</Span>
          {name !== nativeName && (
            <Span style={styles.nativeName}>&#40;{nativeName}&#41;</Span>
          )}
        </Row>
      </Row>
    )
  },
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
)

const styles = StyleSheet.create({
  rowWrapper: {
    justifyContent: 'flex-start',
  },
  nameRow: {
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  flag: {
    width: 24,
    height: 20,
    marginRight: 12,
  },
  flagEmoji: {
    marginRight: 12,
    fontSize: 20,
  },
  nativeName: {
    marginLeft: 3,
  },
})

export default CountryRow
