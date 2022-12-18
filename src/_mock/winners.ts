import { IWinner } from '../features/home/types'

export const WINNERS_MOCK: IWinner[] = [
  {
    id: '1',
    category: 'Animals',
    country: 'RU',
    image: require('../../assets/images/cat.png'),
    authorName: 'Regina Romanova',
    yearsCategory: '8-10 yo',
  },
  {
    id: '2',
    category: 'Nature',
    country: 'RU',
    image: require('../../assets/images/nature.png'),
    authorName: 'Sergey Romanova',
    yearsCategory: '8-10 yo',
  },
]
