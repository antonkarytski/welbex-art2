import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from 'react-native'
import { IdentityDocumentStatus } from '../../../api/parts/users/types.api'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { useText } from '../../../translations/hook'
import Span from '../../../ui/Span'
import { useColors } from '../../themed'
import { ColorFn } from '../../themed/theme'
import {
  CHILD_DOCUMENT_STATUS_DESCRIPTORS,
  ChildDocumentStatusDescriptor,
} from './helpers'

type UserIdentityStatusMessageProps = {
  status: IdentityDocumentStatus
  style?: StyleProp<TextStyle>
}

type StatusDescription = ChildDocumentStatusDescriptor & {
  iconColor?: ColorFn
  style?: TextStyle
  onPress?: (navigate: ReturnType<typeof useNavigate>) => void
}

const PENDING =
  CHILD_DOCUMENT_STATUS_DESCRIPTORS[IdentityDocumentStatus.PENDING]
const REJECTED =
  CHILD_DOCUMENT_STATUS_DESCRIPTORS[IdentityDocumentStatus.REJECTED]

const STATUS_DESCRIPTORS: Partial<
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
    onPress: (navigate) => {
      navigate(links.editProfile)
    },
  },
}
const getStatusMessageDescriptor = (status: IdentityDocumentStatus) => {
  return STATUS_DESCRIPTORS[status]
}

const ChildIdentityStatusMessage = ({
  status,
  style,
}: UserIdentityStatusMessageProps) => {
  const t = useText()
  const colors = useColors()
  const descriptor = getStatusMessageDescriptor(status)
  const navigate = useNavigate()
  if (!descriptor) return null

  const color = descriptor.color?.(colors)
  const iconColor = descriptor.iconColor?.(colors)
  return (
    <TouchableOpacity
      onPress={() => {
        descriptor.onPress?.(navigate)
      }}
      activeOpacity={1}
      style={[styles.container, style]}
    >
      <descriptor.Icon
        style={styles.icon}
        color={color ?? iconColor}
        size={15}
      />
      <Span
        weight={500}
        style={[styles.text, descriptor.style, { color }]}
        label={descriptor.label?.(t)}
      />
    </TouchableOpacity>
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
