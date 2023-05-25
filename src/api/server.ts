import { ServerManager } from '@heyheyjude/toolkit'

export const ROOT_DOMAIN = 'art-sqrd.com'
export const DEV_ROOT_DOMAIN = `test.${ROOT_DOMAIN}`

export const server = new ServerManager({
  initialRoot: ROOT_DOMAIN,
  apiGenerator: (root) => `https://${root}/api/v1`,
})
