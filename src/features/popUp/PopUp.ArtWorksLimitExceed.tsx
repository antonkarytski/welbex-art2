import { infoPopUpFactory } from './factories'

export const PopUpArtWorksLimitExceedFree = infoPopUpFactory.create({
  title: (text) => text.youExceedLimitOfWorksFree,
})
export const PopUpArtWorksLimitExceedPaid = infoPopUpFactory.create({
  title: (text) => text.youExceedLimitOfWorksPaid,
})
