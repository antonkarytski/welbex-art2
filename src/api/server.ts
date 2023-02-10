import { ServerManager } from 'altek-toolkit'
import { db } from '../lib/db'

export const ROOT_DOMAIN = '45.8.97.189'

export const server = new ServerManager({
  initialRoot: ROOT_DOMAIN,
  apiGenerator: (root) => `http://${root}/api/v1`,
  saveTo: db.fields.SERVER_URL,
})
