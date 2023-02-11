import { createEvent, createStore } from 'effector'

export const logOut = createEvent()

// TODO: remove ?
// export const setShouldLogOut = createEvent()
// export const resetLogOutFlag = createEvent()

// export const $logOutFlag = createStore(false)
//   .on(setShouldLogOut, () => true)
//   .reset(resetLogOutFlag)

// $logOutFlag.watch((shouldLogOut) => {
//   if (!shouldLogOut) return
//   logOut()
//   resetLogOutFlag()
// })
