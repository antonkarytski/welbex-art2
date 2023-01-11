import { Drawing } from '../features/drawing/types'
import { getRandomBetween } from './_random'
import { romanov } from './users'

const createDrawing = (drawing: Drawing) => drawing

export const cat = createDrawing({
  image: require('../../assets/images/cat.png'),
  id: 'cat',
  user: romanov,
  likesCount: 110,
  name: 'Koshechka',
  isLiked: false,
  isSaved: false,
})

export const nature = createDrawing({
  image: require('../../assets/images/nature.png'),
  id: 'nature',
  user: romanov,
  likesCount: 110,
  name: 'Priroda Priroda',
  isLiked: false,
  isSaved: false,
})

export const stones = createDrawing({
  image: require('../../assets/images/stones.png'),
  id: 'stones',
  user: romanov,
  likesCount: 110,
  name: 'Kamushki',
  isLiked: false,
  isSaved: false,
})

export const sunrise = createDrawing({
  image: require('../../assets/images/sunrise.png'),
  id: 'sunrise',
  user: romanov,
  likesCount: 110,
  name: 'Voshod Voshod Voshod Voshod Voshod Voshod',
  isLiked: false,
  isSaved: false,
})

const drawingsSet = [cat, nature, stones, sunrise]

export const createRandomDrawing = (
  idModifier: string | number = '',
  mod?: Partial<Drawing>
) => {
  const randomIndex = getRandomBetween(0, drawingsSet.length - 1)
  const drawing = drawingsSet[randomIndex]
  return {
    ...drawing,
    likesCount: getRandomBetween(0, 1000),
    id: `${drawing.id}${idModifier}`,
    ...mod,
  }
}

export const createRandomGallery = (
  galleryId: string,
  size = 10,
  mod?: Partial<Drawing>
) => {
  return Array(size)
    .fill(null)
    .map((_, index) => createRandomDrawing(`${index}${galleryId}`, mod))
}

export const MOCK_RANDOM_DRAWINGS = createRandomGallery('randomStone')
export const MOCK_DRAWINGS_LIST = [
  cat,
  nature,
  stones,
  sunrise,
  ...MOCK_RANDOM_DRAWINGS,
]
