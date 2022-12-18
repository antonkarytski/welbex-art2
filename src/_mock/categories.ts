import {
  CompetitionCategory,
  CompetitionCategoryDetails,
} from '../features/categories/types'
import { MOCK_DRAWINGS_LIST } from './drawings'

export const MOCK_CATEGORIES: CompetitionCategory[] = [
  {
    label: 'Space',
    name: 'space',
    image: require('../../assets/images/space.png'),
    term: '01 - 31 December',
    description:
      'На экране ”Галерея / Категория” отображается обложка конкурса, его название и описание условий. В нижней части, в зависимости от времени загрузки, представлены миниатюры направленных на конкурс работ участников.',
  },
  {
    label: 'Portraits',
    name: 'portraits',
    image: require('../../assets/images/portraits.png'),
    term: '01 - 31 December',
    description:
      'На экране ”Галерея / Категория” отображается обложка конкурса, его название и описание условий. В нижней части, в зависимости от времени загрузки, представлены миниатюры направленных на конкурс работ участников.',
  },
  {
    label: 'Animals',
    name: 'animals',
    image: require('../../assets/images/animals.png'),
    term: '01 - 31 December',
    description:
      'На экране ”Галерея / Категория” отображается обложка конкурса, его название и описание условий. В нижней части, в зависимости от времени загрузки, представлены миниатюры направленных на конкурс работ участников.',
  },
  {
    label: 'Family',
    name: 'family',
    image: require('../../assets/images/family.png'),
    term: '01 - 31 December',
    description:
      'На экране ”Галерея / Категория” отображается обложка конкурса, его название и описание условий. В нижней части, в зависимости от времени загрузки, представлены миниатюры направленных на конкурс работ участников.',
  },
]

export const MOCK_CATEGORIES_DETAILS: CompetitionCategoryDetails[] =
  MOCK_CATEGORIES.map((category) => {
    return { ...category, images: MOCK_DRAWINGS_LIST }
  })
