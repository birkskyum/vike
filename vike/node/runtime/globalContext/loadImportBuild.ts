export { loadImportBuild }
export { setImportBuildGetters }

import { importServerEntry } from '@brillout/vite-plugin-server-entry/importServerEntry.js'
import { assert } from '../utils.js'

const buildGetters = (globalThis.__vike_buildGetters = globalThis.__vike_buildGetters || {
  getters: null
})

type BuildGetters = null | {
  pageFiles: () => Promise<Record<string, unknown>>
  clientManifest: () => Promise<Record<string, unknown>>
  pluginManifest: () => Promise<Record<string, unknown>>
}

function setImportBuildGetters(getters: BuildGetters) {
  buildGetters.getters = getters
}

async function loadImportBuild(outDir?: string) {
  if (!buildGetters.getters) {
    await importServerEntry(outDir)
    assert(buildGetters.getters)
  }

  const [pageFiles, clientManifest, pluginManifest] = await Promise.all([
    buildGetters.getters.pageFiles(),
    buildGetters.getters.clientManifest(),
    buildGetters.getters.pluginManifest()
  ])

  const buildEntries = { pageFiles, clientManifest, pluginManifest }
  return buildEntries
}

declare global {
  var __vike_buildGetters:
    | undefined
    | {
        getters: BuildGetters
      }
}
