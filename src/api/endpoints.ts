import {
  createEndpoint,
  createGet,
  createPut,
} from '../lib/componentsModels/apiBuilder/endpoint'

const artWorksEndpoint = createEndpoint('artWorks')

const createArtWork = artWorksEndpoint.post<{ post: string; author: string }>()

createArtWork({ post: 'post', author: 'author' }) //✅
// @ts-expect-error
createArtWork('post') //❌

//Если body - это примитив то он будет добавлен к url
//если это объект то в посте/путе/патче итд он будет помещен в боди
//в гете он будет преобразован в параметры
//в данном случае результат будет таким
//{ url: 'artWorks/1', method: 'GET', withToken: false }
const getArtWorkById = artWorksEndpoint.get<number>()
getArtWorkById(1) //✅
// @ts-expect-error
getArtWorkById({ id: 1 }) //❌

type Filters = {
  age?: number
  country?: string
}

export const getArtWorksByFilter = artWorksEndpoint.get((filters: Filters) => {
  return {
    url: 'filters',
    body: filters,
  }
})

//В данном случае результат будет таким
//{ url: 'artWorks/filters?age=1&country=country', method: 'GET', withToken: false }
getArtWorksByFilter({ age: 1, country: 'country' }) //✅
// @ts-expect-error
getArtWorksByFilter('age=1') //❌

const getCategories = createGet<number>('categories')
getCategories(22) //✅

type CategoryUpdates = {
  image?: string
  author?: string
}

export const updateCategory = createPut(
  'categories/update',
  (updates: CategoryUpdates & { id: number }) => {
    return {
      url: `/${updates.id}`,
      body: updates,
    }
  }
)

//В данном случае результат будет таким
//{ url: 'categories/update/2?author=me', method: 'PUT', withToken: false }
updateCategory({ author: 'me', id: 2 })

export const api = {}
