import { Drawing } from '../drawing/types'

const createDrawing = (drawing: Drawing) => drawing

export const cat = createDrawing({
  image: require('../../assets/images/cat.png'),
  id: 'cat',
})

export const nature = createDrawing({
  image: require('../../assets/images/nature.png'),
  id: 'nature',
})

export const stones = createDrawing({
  image: require('../../assets/images/stones.png'),
  id: 'stones',
})

export const sunrise = createDrawing({
  image: require('../../assets/images/sunrise.png'),
  id: 'sunrise',
})

const createStones = (id: string) => {
  return createDrawing({
    image: require('../../assets/images/stones.png'),
    id,
  })
}

export const MOCK_STONES = Array(11)
  .fill(null)
  .map((_, index) => createStones(index + 'stone'))

export const MOCK_DRAWINGS_LIST = [cat, nature, stones, sunrise, ...MOCK_STONES]
