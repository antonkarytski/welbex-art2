import { db } from '../lib/db'
import { ApiManager } from '../lib/models/apiBuilder/ApiManager'
import { Tokens } from '../lib/models/apiBuilder/types'

export const apiManager = new ApiManager({
  tokenRefresher: async ({ access }: Tokens) => '',
  saveTo: db.fields.TOKEN,
})
