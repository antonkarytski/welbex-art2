import { useStore } from 'effector-react'
import React, { PropsWithChildren } from 'react'
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { IdentityDocumentStatus } from '../../../api/parts/users/types.api'
import { SCREEN_CONTENT_WIDTH } from '../../../styles/constants'
import { useText } from '../../../translations/hook'
import Row from '../../../ui/Row'
import Span from '../../../ui/Span'
import ErrorIcon from '../../../ui/icons/Icon.Error'
import RefreshIcon from '../../../ui/icons/Icon.Refresh'
import SuccessIcon from '../../../ui/icons/Icon.Success'
import { createThemedStyle } from '../../themed'
import { useThemedStyleList } from '../../themed/hooks'
import { $myProfile } from '../model'
import { getChildDocumentStatusText } from './helpers'

type StatusRowProps = {
  label: string
  style?: {
    label?: StyleProp<TextStyle>
    icon?: StyleProp<ViewStyle>
    row?: StyleProp<ViewStyle>
  }
}

const StatusRow = ({
  label,
  children,
  style,
}: PropsWithChildren<StatusRowProps>) => {
  return (
    <Row style={style?.row}>
      {children}
      <Span label={label} style={style?.label} />
    </Row>
  )
}

const ChildDocumentModerationStatusBlock = () => {
  const text = useText()
  const { colors, styles } = useThemedStyleList({
    common: themedStyles,
  })
  const myProfile = useStore($myProfile)
  const documentStatus = myProfile?.identity_determined_status_id
  const labelText = getChildDocumentStatusText(documentStatus, text)

  if (documentStatus === IdentityDocumentStatus.UNDETERMINED) {
    return null
  }

  if (documentStatus === IdentityDocumentStatus.PENDING) {
    return (
      <StatusRow label={labelText} style={styles.common}>
        <RefreshIcon color={colors.textGrey} style={styles.common.icon} />
      </StatusRow>
    )
  }
  if (documentStatus === IdentityDocumentStatus.REJECTED) {
    return (
      <StatusRow label={labelText} style={styles.common}>
        <ErrorIcon color={colors.errorBorder} style={styles.common.icon} />
      </StatusRow>
    )
  }
  if (documentStatus === IdentityDocumentStatus.DETERMINED) {
    return (
      <StatusRow label={labelText} style={styles.common}>
        <SuccessIcon
          size={20}
          color={colors.successBorder}
          style={styles.common.icon}
        />
      </StatusRow>
    )
  }
  return null
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    label: {
      color: colors.text,
      fontSize: 16,
      maxWidth: SCREEN_CONTENT_WIDTH - 40,
    },
    icon: {
      marginRight: 16,
    },
    row: {
      justifyContent: 'flex-start',
      marginBottom: 16,
    },
  })
)

export default ChildDocumentModerationStatusBlock
