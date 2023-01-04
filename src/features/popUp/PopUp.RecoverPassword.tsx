import React from 'react'
import { StyleSheet } from 'react-native'
import { PopUpFactory } from '../../lib/componentsModels/popUp/factory'
import { usePopUpModel } from '../../lib/componentsModels/popUp/hooks'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Span from '../../ui/Span'
import PresetButton from '../../ui/buttons/PresetButton'
import PopUpCard from '../../ui/popUp/PopUpCard'

type PopUpRecoverPasswordProps = {}
type PopUpOpenProps = {
  email: string
}

const model = PopUpFactory.createModel<PopUpOpenProps>()

const PopUpRecoverPassword = PopUpFactory.appendModel(
  ({}: PopUpRecoverPasswordProps) => {
    const text = useText()
    const popUp = usePopUpModel(model)
    if (popUp.props) {
      popUp.props.email
    }

    return (
      <PopUpCard style={styles.card} model={model}>
        <H2 style={styles.header} label={text.recoverPassword} />
        <Span>
          {`${text.passwordSentToEmail} `}
          <Span
            weight={600}
            label={popUp.props?.email ? `"${popUp.props?.email}"` : ''}
          />
          {` ${text.withFurtherInstructions}`}
        </Span>
        <PresetButton
          style={styles.button}
          label={text.backToLogIn}
          onPress={() => {}}
        />
      </PopUpCard>
    )
  },
  model
)

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 12,
    marginBottom: 12,
  },
  button: {
    marginTop: 32,
  },
})

export default PopUpRecoverPassword
