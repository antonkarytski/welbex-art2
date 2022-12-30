import { PopUpFactory } from '../../lib/componentsModels/popUp/factory'
import InfoPopUpCard from '../../ui/popUp/InfoPopUpCard'
import PopUpCard from '../../ui/popUp/PopUpCard'
import SubmitPopUpCard from '../../ui/popUp/SubmitPopUpCard'

export const commonPopUpFactory = new PopUpFactory(PopUpCard)
export const submitPopUpFactory = new PopUpFactory(SubmitPopUpCard)
export const infoPopUpFactory = new PopUpFactory(InfoPopUpCard)
