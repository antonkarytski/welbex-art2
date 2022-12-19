import React, { ReactNode } from 'react'
import { Text as RawText, TextProps } from 'react-native'
import { setDefaults, textStyles } from './styles'

type ThemedTextProps = {
  medium?: true
  bold?: true
  semiBold?: true
  children?: ReactNode
  label?: string
} & TextProps

export default function Text({
  medium,
  bold,
  semiBold,
  children,
  style,
  label,
  ...props
}: ThemedTextProps) {
  const fontStyle = [
    textStyles.regular,
    textStyles.defaults,
    medium ? textStyles.medium : null,
    bold ? textStyles.bold : null,
    semiBold ? textStyles.semiBold : null,
    style,
  ]

  return (
    <RawText style={fontStyle} {...props}>
      {label || children}
    </RawText>
  )
}

Text.setDefaults = setDefaults

export { textStyles }
