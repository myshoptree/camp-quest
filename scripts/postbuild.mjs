/**
 * Post-build step for GitHub Pages:
 *
 * TanStack Start's SPA build writes the hydratable shell to dist/client/_shell.html,
 * but GitHub Pages serves /<repo>/ by looking for index.html at the artifact root.
 * We copy the shell to:
 *   - dist/client/index.html           → served at /camp-quest/
 *   - dist/client/404.html             → SPA fallback for deep URLs
 *
 * We also keep public/.nojekyll and public/404.html's redirect script, but
 * overwrite 404.html with the SPA shell so any missing path hydrates the app
 * (the router resolves the actual route client-side).
 */
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const OUT = 'dist/client'
const SHELL = join(OUT, '_shell.html')

if (!existsSync(SHELL)) {
  console.error(`[postbuild] missing ${SHELL} — did the SPA build complete?`)
  process.exit(1)
}

const shellHtml = readFileSync(SHELL, 'utf8')

// index.html: entry served at /camp-quest/
writeFileSync(join(OUT, 'index.html'), shellHtml)

// 404.html: GitHub Pages serves this for any unknown path under the base.
// Overwriting with the SPA shell makes the client router take over seamlessly
// — e.g. /camp-quest/journal/foo hydrates and TanStack Router resolves it.
writeFileSync(join(OUT, '404.html'), shellHtml)

// Ensure .nojekyll exists even if public/.nojekyll was missing.
const nojekyll = join(OUT, '.nojekyll')
if (!existsSync(nojekyll)) writeFileSync(nojekyll, '')

console.log('[postbuild] wrote dist/client/index.html, dist/client/404.html, dist/client/.nojekyll')
