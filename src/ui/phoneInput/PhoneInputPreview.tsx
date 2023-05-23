import { ChevronDownIcon } from 'native-base'
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { COUNTRIES, CountryCode } from '../../features/countries'
import Span from '../Span'

type PhoneInputPreviewProps = {
  value: string
  country: CountryCode
  title: string
  style?: StyleProp<ViewStyle>
  colors?: {
    background?: string
    border?: string
    title?: string
    value?: string
  }
}

const PhoneInputPreview = ({
  value,
  country,
  title,
  style,
  colors,
}: PhoneInputPreviewProps) => {
  const code = country.toUpperCase() as CountryCode
  const borderStyle = !!colors?.border && { borderColor: colors.border }

  return (
    <View style={style}>
      <Span
        weight={500}
        style={[styles.label, !!colors?.title && { color: colors.title }]}
        label={title}
      />
      <View
        style={[
          styles.container,
          !!colors?.background && { backgroundColor: colors.background },
          borderStyle,
        ]}
      >
        <View style={[styles.flagContainer, borderStyle]}>
          <Span style={styles.flag} label={COUNTRIES[code]?.emoji || code} />
          <ChevronDownIcon size={4} color={colors?.value} />
        </View>
        <View style={styles.phoneContainer}>
          <Span style={{ color: colors?.value }} label={value} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    height: 52,
    overflow: 'hidden',
  },
  flagContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    height: '100%',
    flexDirection: 'row',
  },
  flag: {
    color: '#000',
    marginRight: 10,
    fontSize: 20,
  },
  phoneContainer: {
    paddingLeft: 20,
  },
  label: {
    marginBottom: 8,
  },
})

export default PhoneInputPreview
