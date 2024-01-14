export { prerender }

import type { PrerenderOptions } from '../prerender/runPrerender.js'

async function prerender(options: PrerenderOptions) {
  const { resolve } = await import('path')
  const { partial, noExtraDir, base, parallel, outDir, configFile } = options
  const root = options.root && resolve(options.root)

  const { isVikeCliCall } = await import('./utils.js')
  if (isVikeCliCall()) {
    const { runPrerender_forceExit, runPrerenderFromCLI } = await import('../prerender/runPrerender.js')
    await runPrerenderFromCLI({ partial, noExtraDir, base, root, parallel, outDir, configFile })
    runPrerender_forceExit()
  } else {
    const { runPrerenderFromAPI } = await import('../prerender/runPrerender.js')
    await runPrerenderFromAPI({ partial, noExtraDir, base, root, parallel, outDir, configFile })
  }
}
