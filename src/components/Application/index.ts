import { withInstall } from '@/utils'

import appLogo from './src/AppLogo.vue'
import appProvider from './src/AppProvider.vue'

export { useAppProviderContext } from './src/useAppContext'

export const AppLogo = withInstall(appLogo)
export const AppProvider = withInstall(appProvider)
