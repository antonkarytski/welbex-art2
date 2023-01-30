import { cardToDeleteModel } from '../payment/model'
import { submitPopUpFactory } from './factories'

const PopUpDeletePaymentCard = submitPopUpFactory.create({
  title: (text) => text.deleteCardConfirmationQ,
  onSubmit: () => {},
})

export default PopUpDeletePaymentCard
