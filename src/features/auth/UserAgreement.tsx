import { View } from 'native-base'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { createStateModel, useStateStore } from 'altek-toolkit'
import { checkboxThemedPreset } from '../../styles/checkbox'
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
  const { styles } = useThemedStyleList({
    feature: themedStyles,
    checkbox: checkboxThemedPreset,
  })
  const [isPolicyAccepted, setIsPolicyAccepted] =
    useStateStore(userAgreementModel)

  const onOpenUserAgreement = () => {}
  const onOpenPrivacyPolicy = () => {}

  return (
    <CheckBox
      onSelect={setIsPolicyAccepted}
      isSelected={isPolicyAccepted}
      isInvalid={isPolicyAccepted ? false : isInvalid}
      style={{
        checkbox: styles.feature.checkbox,
        container: styles.feature.container,
      }}
      iconSize={10}
      preset={styles.checkbox}
    >
      <View style={styles.feature.rowWrapper}>
        <Row style={styles.feature.row}>
          <Span style={styles.feature.textWrapper}>
            <Span style={styles.feature.text}>{`${t.IAccept} `}</Span>
            <TouchableOpacity onPress={onOpenUserAgreement} activeOpacity={0.6}>
              <Span style={[styles.feature.text, styles.feature.links]}>
                {t.userAgreement}
              </Span>
            </TouchableOpacity>
            <Span style={styles.feature.text}>{` ${t.and} `}</Span>
            <TouchableOpacity onPress={onOpenPrivacyPolicy} activeOpacity={0.6}>
              <Span style={[styles.feature.text, styles.feature.links]}>
                {t.privacyPolicy}
              </Span>
            </TouchableOpacity>
          </Span>
        </Row>
      </View>
    </CheckBox>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      marginBottom: 12,
    },
    row: { justifyContent: 'flex-start' },
    rowWrapper: { marginLeft: 12 },
    textWrapper: {
      textAlignVertical: 'center',
    },
    text: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.text,
    },
    links: {
      color: colors.textAccent,
      textDecorationLine: 'underline',
    },
    checkbox: {
      width: 16,
      height: 16,
    },
  })
)

export default UserAgreement
