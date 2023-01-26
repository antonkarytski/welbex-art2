import React from 'react'
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import Row from '../../ui/Row'
import Span from '../../ui/Span'
import { Country } from './types'

type CountryRowProps = {
  item: Country
  style?: {
    rowWrapper?: StyleProp<ViewStyle>
    nameRow?: StyleProp<ViewStyle>
    flag?: StyleProp<TextStyle>
    nativeName?: StyleProp<TextStyle>
    name?: StyleProp<TextStyle>
  }
}

const CountryRow = React.memo(
  ({ item, style }: CountryRowProps) => {
    const { name, nativeName, emoji } = item
    return (
      <Row style={[styles.rowWrapper, style?.rowWrapper]}>
        <Span style={[styles.flagEmoji, style?.flag]}>{emoji}</Span>
        <Row style={[styles.nameRow, style?.nameRow]}>
          <Span style={[styles.name, style?.name]}>{name}</Span>
          {name !== nativeName && (
            <Span style={[styles.nativeName, style?.name, style?.nativeName]}>
              &#40;{nativeName}&#41;
            </Span>
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
  name: {},
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
