import { PopUpFactory } from '../../lib/componentsModels/popUp/factory'
import PopUpCard from '../../ui/popUp/PopUpCard'
import SubmitPopUpCard from '../../ui/popUp/SubmitPopUpCard'

export const commonPopUpFactory = new PopUpFactory(PopUpCard)
export const submitPopUpFactory = new PopUpFactory(SubmitPopUpCard)
