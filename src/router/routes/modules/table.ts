import type { AppRouteModule } from '@/router/types'

import { LAYOUT } from '@/router/constant'
import { t } from '@/hooks/web/useI18n'

const table: AppRouteModule = {
  path: '/table',
  name: 'Table',
  component: LAYOUT,
  redirect: '/table/tableExample1',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.table'),
  },
  children: [
    {
      path: 'tableExample1',
      name: 'TableExample1',
      component: () => import('@/views/table/tableExample1/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.table'),
      },
    },
  ],
}

export default table
