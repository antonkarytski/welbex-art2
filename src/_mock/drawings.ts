import { Drawing } from '../features/drawing/types'
import { romanov } from './users'

const createDrawing = (drawing: Drawing) => drawing

export const cat = createDrawing({
  image: require('../../assets/images/cat.png'),
  id: 'cat',
  user: romanov,
})

export const nature = createDrawing({
  image: require('../../assets/images/nature.png'),
  id: 'nature',
  user: romanov,
})

export const stones = createDrawing({
  image: require('../../assets/images/stones.png'),
  id: 'stones',
  user: romanov,
})

export const sunrise = createDrawing({
  image: require('../../assets/images/sunrise.png'),
  id: 'sunrise',
  user: romanov,
})

const createStones = (id: string) => {
  return createDrawing({
    image: require('../../assets/images/stones.png'),
    id,
    user: romanov,
  })
}

export const MOCK_STONES = Array(11)
  .fill(null)
  .map((_, index) => createStones(index + 'stone'))

export const MOCK_DRAWINGS_LIST = [cat, nature, stones, sunrise, ...MOCK_STONES]
