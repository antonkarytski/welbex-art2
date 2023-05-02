import React from 'react'
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { FONT_MEDIUM } from '../../styles/fonts'
import Row from '../../ui/Row'
import Span from '../../ui/Span'
import { defaultColors } from '../themed/theme'
import { Country } from './types'

export type CountryRowStyles = {
  text?: StyleProp<TextStyle>
  rowWrapper?: StyleProp<ViewStyle>
  nameRow?: StyleProp<ViewStyle>
  flag?: StyleProp<TextStyle>
  nativeName?: StyleProp<TextStyle>
  name?: StyleProp<TextStyle>
}

type CountryRowProps = {
  item: Country
  isSelected?: boolean
  style?: CountryRowStyles
}

const CountryRow = React.memo(
  ({ item, style, isSelected }: CountryRowProps) => {
    const { name, nativeName, emoji } = item
    return (
      <Row style={[styles.rowWrapper, style?.rowWrapper]}>
        <Span style={[styles.flagEmoji, style?.text, style?.flag]}>
          {emoji}
        </Span>
        <Row style={[styles.nameRow, style?.nameRow]}>
          <Span
            style={[
              styles.name,
              style?.text,
              style?.name,
              isSelected && styles.name__selected,
            ]}
          >
            {name}
          </Span>
          {name !== nativeName && (
            <Span
              style={[
                styles.name,
                styles.nativeName,
                style?.text,
                style?.name,
                style?.nativeName,
                isSelected && styles.name__selected,
              ]}
            >
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
  name: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: FONT_MEDIUM,
    color: defaultColors.text,
  },
  name__selected: {
    color: defaultColors.textAccent,
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
