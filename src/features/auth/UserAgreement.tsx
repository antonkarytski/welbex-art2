import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { createStateModel, useStateStore } from 'altek-toolkit'
import { useText } from '../../translations/hook'
import Row from '../../ui/Row'
import Span from '../../ui/Span'
import CheckBox from '../../ui/checkbox/CheckBox'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'

export const userAgreementModel = createStateModel(false)

export type UserAgreementProps = {
  isInvalid: undefined | boolean
}

const UserAgreement = ({ isInvalid }: UserAgreementProps) => {
  const t = useText()
  const { styles } = useThemedStyleList({ feature: themedStyles })
  const [isPolicyAccepted, setIsPolicyAccepted] =
    useStateStore(userAgreementModel)

  const onOpenUserAgreement = () => {}
  const onOpenPrivacyPolicy = () => {}

  return (
    <CheckBox
      onSelect={setIsPolicyAccepted}
      isSelected={isPolicyAccepted}
      isInvalid={isPolicyAccepted ? false : isInvalid}
    >
      <Row>
        <Span style={styles.feature.text}>{`${t.IAccept} `}</Span>
        <TouchableOpacity onPress={onOpenUserAgreement} activeOpacity={0.6}>
          <Span style={[styles.feature.text, styles.feature.links]}>
            {`${t.userAgreement} `}
          </Span>
        </TouchableOpacity>
        <Span style={styles.feature.text}>{`${t.and} `}</Span>
        <TouchableOpacity onPress={onOpenPrivacyPolicy} activeOpacity={0.6}>
          <Span style={[styles.feature.text, styles.feature.links]}>
            {t.privacyPolicy}
          </Span>
        </TouchableOpacity>
      </Row>
    </CheckBox>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    text: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.text,
    },
    links: {
      color: colors.textAccent,
      textDecorationLine: 'underline',
    },
  })
)

export default UserAgreement
