import type { Config } from 'vike/types'
import Layout from '../layouts/LayoutDefault'
import Head from '../layouts/HeadDefault'
import logoUrl from '../assets/logo.svg'
import vikeReact from 'vike-react/config'

// Default configs (can be overriden by pages)
export default {
  ssr: true,
  Layout,
  Head,
  // <title>
  title: 'My Vike + React App',
  // <link rel="icon" href="${favicon}" />
  favicon: logoUrl,
  extends: vikeReact
} satisfies Config
