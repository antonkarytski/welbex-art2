import { useStore } from 'effector-react'
import { winnersListModel } from './request'

export const useWinnersModel = () => {
  const winners = useStore(winnersListModel.$items)
  const isNextLoading = useStore(winnersListModel.$isNextLoading)
  const isLoading = useStore(winnersListModel.$isLoading)

  return {
    winners,
    isNextLoading,
    isLoading,
    getNextSync: winnersListModel.getNextSync,
  }
}
