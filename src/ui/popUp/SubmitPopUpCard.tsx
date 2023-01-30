import React from 'react'
import { StyleSheet, TextStyle } from 'react-native'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { ColorFn } from '../../features/themed/theme'
import { PopUpModel } from '../../lib/componentsModels/popUp/model'
import { useNavigate } from '../../navigation'
import { buttonCommonThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import { LangFn } from '../../translations/types'
import Span from '../Span'
import TextButton from '../buttons/Button.Text'
import PresetButton from '../buttons/PresetButton'
import PopUpCard from './PopUpCard'

type OnSubmitProps = { navigate: ReturnType<typeof useNavigate> }

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
      onSubmit: (props: OnSubmitProps) => void
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
  const navigate = useNavigate()
  const { styles, colors } = useThemedStyleList({
    common: themedStyles,
    button: buttonCommonThemedPreset,
  })

  return (
    <PopUpCard style={styles.common.card} model={model}>
      <Span
        weight={600}
        style={[styles.common.header, headerStyle]}
        label={typeof title === 'function' ? title(text) : title}
      />
      {!hideSubmit && (
        <PresetButton
          style={styles.common.submitButton}
          preset={styles.button}
          label={text.yes}
          onPress={() => {
            model.hideSync()
            onSubmit({ navigate })
          }}
        />
      )}
      <TextButton
        style={{
          label: [
            styles.common.cancelButtonLabel,
            typeof closeButtonLabelStyle === 'function'
              ? closeButtonLabelStyle(colors)
              : closeButtonLabelStyle,
          ],
          button: styles.common.cancelButton,
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
      paddingBottom: 16.5,
    },
    header: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 32,
      textAlign: 'center',
    },
    submitButton: {
      marginBottom: 8.5,
    },
    cancelButton: {
      paddingVertical: 15.5,
      paddingHorizontal: 20,
    },
    cancelButtonLabel: {
      color: colors.tipText,
    },
  })
)

export default SubmitPopUpCard
