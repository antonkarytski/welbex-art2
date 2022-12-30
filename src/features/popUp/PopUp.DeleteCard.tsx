import { submitPopUpFactory } from './factories'

const PopUpDeleteCard = submitPopUpFactory.create({
  title: (text) => text.deleteCardConfirmationQ,
})

export default PopUpDeleteCard
