import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { getContext } from './integrations/tanstack-query/root-provider'

// GitHub Pages serves this app under /camp-quest/, so <Link>s must respect
// that prefix in production. Dev leaves the basepath empty so the app lives
// at the root of localhost. Vite inlines import.meta.env.PROD per build.
const BASEPATH = import.meta.env.PROD ? '/camp-quest' : undefined

export function getRouter() {
  const context = getContext()

  const router = createTanStackRouter({
    routeTree,
    context,
    basepath: BASEPATH,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })

  setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
