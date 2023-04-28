import { ServerManager } from 'altek-toolkit'

export const ROOT_DOMAIN = 'art-sqrd.com' //'45.8.97.189'

export const server = new ServerManager({
  initialRoot: ROOT_DOMAIN,
  apiGenerator: (root) => `https://${root}/api/v1`,
})
