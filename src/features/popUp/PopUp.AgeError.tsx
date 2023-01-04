import { infoPopUpFactory } from './factories'

const PopUpAgeError = infoPopUpFactory.create({
  title: (text) => text.createPostAgeError,
})

export default PopUpAgeError
