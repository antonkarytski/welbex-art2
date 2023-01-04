import { infoPopUpFactory } from './factories'

const PopUpUnexpectedError = infoPopUpFactory.create({
  title: (text) => text.unexpectedError,
})

export default PopUpUnexpectedError
