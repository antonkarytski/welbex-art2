import { IWinner } from '../features/winners/types'
import { reginaRomanova, romanov } from './users'

export const WINNERS_MOCK: IWinner[] = [
  {
    id: '1',
    category: 'Animals',
    image: require('../../assets/images/cat.png'),
    yearsCategory: '8-10 yo',
    author: reginaRomanova,
  },
  {
    id: '2',
    category: 'Nature',
    author: romanov,
    image: require('../../assets/images/nature.png'),
    yearsCategory: '8-10 yo',
  },
]
