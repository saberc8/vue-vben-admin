import type { Menu } from '@/router/types'
import type { PropType } from 'vue'

import { MenuModeEnum } from '@/enums/menuEnum'
import type { MenuMode } from 'ant-design-vue/lib/menu/src/interface'
export const basicProps = {
  items: {
    type: Array as PropType<Menu[]>,
    default: () => [],
  },
  collapsedShowTitle: Boolean,
  // 最好是4 倍数
  inlineIndent: {
    type: Number,
    default: 20,
  },
  // 菜单组件的mode属性
  mode: {
    type: String as PropType<MenuMode>,
    default: MenuModeEnum.INLINE,
  },

  type: {
    type: String,
    default: 'sidebar',
  },
  inlineCollapsed: Boolean,
  beforeClickFn: {
    type: Function as PropType<(key: string) => Promise<boolean>>,
  },
}

export const itemProps = {
  item: {
    type: Object as PropType<Menu>,
    default: {},
  },
  level: Number,
  showTitle: Boolean,
}

export const contentProps = {
  item: {
    type: Object as PropType<Menu>,
    default: null,
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
  level: {
    type: Number,
    default: 0,
  },
}
