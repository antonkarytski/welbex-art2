import React from 'react'
import { StyleSheet, TextStyle } from 'react-native'
import { createThemedStyle } from '../../features/themed'
import { useTheme } from '../../features/themed/hooks'
import { ColorFn } from '../../features/themed/theme'
import { PopUpModel } from '../../lib/componentsModels/popUp/model'
import { useText } from '../../translations/hook'
import { LangFn } from '../../translations/types'
import Span from '../Span'
import TextButton from '../buttons/Button.Text'
import PresetButton from '../buttons/PresetButton'
import { ButtonPresetName, getButtonPreset } from '../buttons/styles'
import PopUpCard from './PopUpCard'

export type SubmitPopUpCardProps = {
  model: PopUpModel
  title: LangFn | string
  onClose?: () => void
  closeButtonLabel?: string | LangFn
  closeButtonLabelStyle?: TextStyle | ColorFn<TextStyle>
  headerStyle?: TextStyle
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
  headerStyle,
  closeButtonLabelStyle,
  closeButtonLabel,
}: SubmitPopUpCardProps) => {
  const text = useText()
  const { styles, theme, colors } = useTheme(themedStyles)

  return (
    <PopUpCard style={styles.card} model={model}>
      <Span
        weight={600}
        style={[styles.header, headerStyle]}
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
      <TextButton
        style={{
          label: [
            styles.cancelButtonLabel,
            typeof closeButtonLabelStyle === 'function'
              ? closeButtonLabelStyle(colors)
              : closeButtonLabelStyle,
          ],
          button: styles.cancelButton,
        }}
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
      marginBottom: 14,
    },
    cancelButton: {
      paddingHorizontal: 20,
    },
    cancelButtonLabel: {
      color: colors.tipText,
    },
  })
)

export default SubmitPopUpCard
