import React from 'react'
import { StyleSheet } from 'react-native'
import { LangFn } from '../../translations/types'
import SubmitPopUpCard, { SubmitPopUpCardProps } from './SubmitPopUpCard'

type InfoPopUpProps = Omit<
  SubmitPopUpCardProps,
  'hideSubmit' | 'onSubmit' | 'headerStyle' | 'closeButtonColor'
>
const closeLangFn: LangFn = (text) => text.close

const InfoPopUpCard = ({ closeButtonLabel, ...props }: InfoPopUpProps) => {
  return (
    <SubmitPopUpCard
      hideSubmit
      closeButtonLabel={closeButtonLabel ?? closeLangFn}
      closeButtonLabelStyle={(colors) => ({
        color: colors.textAccent,
      })}
      headerStyle={styles.header}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16.5,
  },
})

export default InfoPopUpCard
