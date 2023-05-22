import React, { ReactElement } from 'react'
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native'
import { IdentityDocumentStatus } from '../../../api/parts/users/types.api'
import { useText } from '../../../translations/hook'
import { LangFn } from '../../../translations/types'
import Span from '../../../ui/Span'
import { IconProps } from '../../../ui/icons/_types'
import { useColors } from '../../themed'
import { ColorFn } from '../../themed/theme'
import { CHILD_DOCUMENT_STATUS_DESCRIPTORS } from './helpers'

type UserIdentityStatusMessageProps = {
  status: IdentityDocumentStatus
  style?: StyleProp<TextStyle>
}

type StatusDescription = {
  color?: ColorFn
  iconColor?: ColorFn
  label: LangFn
  Icon: (props: IconProps) => ReactElement | null
  style?: TextStyle
}

const PENDING =
  CHILD_DOCUMENT_STATUS_DESCRIPTORS[IdentityDocumentStatus.PENDING]
const REJECTED =
  CHILD_DOCUMENT_STATUS_DESCRIPTORS[IdentityDocumentStatus.REJECTED]

const STATUS_COLORS: Partial<
  Record<IdentityDocumentStatus, StatusDescription>
> = {
  [IdentityDocumentStatus.PENDING]: {
    ...PENDING,
    color: (c) => c.primary1,
  },
  [IdentityDocumentStatus.REJECTED]: {
    ...REJECTED,
    color: (c) => c.errorText,
    iconColor: (c) => c.errorIcon,
    style: {
      textDecorationLine: 'underline',
    },
  },
}
const getStatusMessageDescriptor = (status: IdentityDocumentStatus) => {
  return STATUS_COLORS[status]
}

const ChildIdentityStatusMessage = ({
  status,
  style,
}: UserIdentityStatusMessageProps) => {
  const t = useText()
  const colors = useColors()
  const descriptor = getStatusMessageDescriptor(status)
  if (!descriptor) return null

  const color = descriptor.color?.(colors)
  const iconColor = descriptor.iconColor?.(colors)
  return (
    <View style={[styles.container, style]}>
      <descriptor.Icon
        style={styles.icon}
        color={color ?? iconColor}
        size={15}
      />
      <Span
        weight={500}
        style={[styles.text, descriptor.style, { color }]}
        label={descriptor.label(t)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 36,
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    marginLeft: 8,
  },
  icon: {
    marginTop: 2,
  },
})

export default ChildIdentityStatusMessage
