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
})

export const nature = createDrawing({
  image: require('../../assets/images/nature.png'),
  id: 'nature',
  user: romanov,
  likesCount: 110,
  name: 'Priroda Priroda',
})

export const stones = createDrawing({
  image: require('../../assets/images/stones.png'),
  id: 'stones',
  user: romanov,
  likesCount: 110,
  name: 'Kamushki',
})

export const sunrise = createDrawing({
  image: require('../../assets/images/sunrise.png'),
  id: 'sunrise',
  user: romanov,
  likesCount: 110,
  name: 'Voshod Voshod Voshod Voshod Voshod Voshod',
})

const drawingsSet = [cat, nature, stones, sunrise]

export const createRandomDrawing = (idModifier: string | number = '') => {
  const randomIndex = getRandomBetween(0, drawingsSet.length - 1)
  const drawing = drawingsSet[randomIndex]
  return {
    ...drawing,
    likesCount: getRandomBetween(0, 1000),
    id: `${drawing.id}${idModifier}`,
  }
}

export const createRandomGallery = (galleryId: string, size = 10) => {
  return Array(size)
    .fill(null)
    .map((_, index) => createRandomDrawing(`${index}${galleryId}`))
}

export const MOCK_RANDOM_DRAWINGS = createRandomGallery('randomStone')
export const MOCK_DRAWINGS_LIST = [
  cat,
  nature,
  stones,
  sunrise,
  ...MOCK_RANDOM_DRAWINGS,
]
