import { db } from '../../lib/db'

export const onBoardingWasShownModel = {
  set: () => {
    db.setSync(db.fields.ONBOARD_WAS_SHOWN, true)
  },
  get: () => {
    return onBoardingWasShownModel.current
  },
  init: () => {
    return db.get(db.fields.ONBOARD_WAS_SHOWN).then((value) => {
      onBoardingWasShownModel.current = !!value
      return value
    })
  },
  current: false,
}
