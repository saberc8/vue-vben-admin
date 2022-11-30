import type { AppRouteModule } from '/@/router/types'

import { getParentLayout, LAYOUT } from '/@/router/constant'

const permission: AppRouteModule = {
  path: '/level2',
  name: 'level2',
  component: LAYOUT,
  redirect: '/level2/menu1/menu1-1/menu1-1-1',
  meta: {
    orderNo: 2000,
    icon: 'ion:menu-outline',
    title: 'level2',
  },

  children: [
    {
      path: 'menu1',
      name: 'Menu1Demo',
      component: getParentLayout('Menu1Demo'),
      meta: {
        title: 'Menu1',
      },
      redirect: '/level2/menu1/menu1-1/menu1-1-1',
      children: [
        {
          path: 'menu1-1',
          name: 'Menu11Demo',
          component: getParentLayout('Menu11Demo'),
          meta: {
            title: 'Menu1-1',
          },
          redirect: '/level2/menu1/menu1-1/menu1-1-1',
          children: [
            {
              path: 'menu1-1-1',
              name: 'Menu111Demo',
              component: () => import('@/views/demo/level2/Menu111.vue'),
              meta: {
                title: 'Menu111',
              },
            },
          ],
        },
        {
          path: 'menu1-2',
          name: 'Menu12Demo',
          component: () => import('@/views/demo/level2/Menu12.vue'),
          meta: {
            title: 'Menu1-2',
          },
        },
      ],
    },
    {
      path: 'menu2',
      name: 'Menu2Demo',
      component: () => import('@/views/demo/level2/Menu2.vue'),
      meta: {
        title: 'Menu2',
        // ignoreKeepAlive: true,
      },
    },
  ],
}

export default permission
