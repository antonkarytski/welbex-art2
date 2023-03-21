import { deleteAvatar } from '../../profile/editProfile/request'
import { submitPopUpFactory } from '../factories'

const PopUpDeleteAvatar = submitPopUpFactory.create({
  title: (text) => text.deleteAvatarQ,
  onSubmit: () => {
    deleteAvatar()
  },
})

export default PopUpDeleteAvatar
