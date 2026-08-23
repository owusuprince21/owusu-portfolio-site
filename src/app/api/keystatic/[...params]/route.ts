import { makeRouteHandler } from '@keystatic/next/route-handler'
import keystaticConfig, { showAdminUI } from '../../../../../keystatic.config'

const notFoundRouteHandler = () =>
  new Response(null, {
    status: 404,
  })

export const { POST, GET } =
  showAdminUI === false
    ? { GET: notFoundRouteHandler, POST: notFoundRouteHandler }
    : makeRouteHandler({
        config: keystaticConfig,
      })
