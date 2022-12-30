import { logOut } from '../authServices/logOut'
import { submitPopUpFactory } from './factories'

const PopUpLogOut = submitPopUpFactory.create({
  title: (text) => text.logOutConfirmationQ,
  onSubmit: () => logOut(),
})

export default PopUpLogOut
