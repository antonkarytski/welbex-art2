import { submitPopUpFactory } from './factories'

const PopUpSaveChanges = submitPopUpFactory.create({
  title: (text) => text.saveChangesQ,
})

export default PopUpSaveChanges
