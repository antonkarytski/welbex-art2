import React from 'react'
import { StyleSheet } from 'react-native'
import { createThemedStyle } from '../../features/themed'
import { useTheme } from '../../features/themed/hooks'
import { PopUpModel } from '../../lib/componentsModels/popUp/model'
import { useText } from '../../translations/hook'
import { LangFn } from '../../translations/types'
import Span from '../Span'
import PresetButton from '../buttons/PresetButton'
import { ButtonPresetName, getButtonPreset } from '../buttons/styles'
import PopUpCard from './PopUpCard'

type SubmitPopUpCardProps = {
  model: PopUpModel
  title: LangFn | string
  onClose?: () => void
  closeButtonLabel?: string | LangFn
} & (
  | {
      hideSubmit?: never
      onSubmit: () => void
    }
  | {
      hideSubmit: true
      onSubmit?: never
    }
)

const SubmitPopUpCard = ({
  model,
  title,
  onSubmit,
  onClose,
  hideSubmit,
  closeButtonLabel,
}: SubmitPopUpCardProps) => {
  const text = useText()
  const { styles, theme } = useTheme(themedStyles)

  return (
    <PopUpCard style={styles.card} model={model}>
      <Span
        weight={600}
        style={styles.header}
        label={typeof title === 'function' ? title(text) : title}
      />
      {!hideSubmit && (
        <PresetButton
          style={styles.submitButton}
          preset={getButtonPreset(theme, ButtonPresetName.COMMON)}
          label={text.yes}
          onPress={() => {
            model.hideSync()
            onSubmit()
          }}
        />
      )}
      <PresetButton
        preset={getButtonPreset(theme, ButtonPresetName.WO_BORDER)}
        label={
          (typeof closeButtonLabel === 'function'
            ? closeButtonLabel(text)
            : closeButtonLabel) || text.no
        }
        onPress={() => {
          model.hideSync()
          onClose?.()
        }}
      />
    </PopUpCard>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    card: {
      paddingTop: 32,
      alignItems: 'center',
      width: 320,
    },
    header: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 32,
      textAlign: 'center',
    },
    submitButton: {
      marginBottom: 9.5,
    },
  })
)

export default SubmitPopUpCard
