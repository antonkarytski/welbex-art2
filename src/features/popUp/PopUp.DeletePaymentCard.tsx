import { noop } from '../../lib/helpers'
import { links } from '../../navigation/links'
import { InfoMessageType } from '../infoMessage/types'
import { deletePaymentCardFx } from '../payment/model'
import { submitPopUpFactory } from './factories'

const PopUpDeletePaymentCard = submitPopUpFactory.create({
  title: (text) => text.deleteCardConfirmationQ,
  onSubmit: ({ navigate }) => {
    deletePaymentCardFx().catch(noop)
    navigate(links.infoMessage, { type: InfoMessageType.CARD_DELETED })
  },
})

export default PopUpDeletePaymentCard
