import { updateMyProfileRequest } from '../profile/editProfile/request'
import { submitPopUpFactory } from './factories'

const PopUpSaveChanges = submitPopUpFactory.create({
  title: (text) => text.saveChangesQ,
  onSubmit: () => {
    updateMyProfileRequest()
  },
})

export default PopUpSaveChanges
