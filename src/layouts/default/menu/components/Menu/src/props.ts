import type { Menu } from '@/router/types'
import type { PropType } from 'vue'
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
