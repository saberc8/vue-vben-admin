import { ContentEnum, RouterTransitionEnum } from '@/enums/appEnum'
import {
  MenuModeEnum,
  MenuTypeEnum,
  TopMenuAlignEnum,
  TriggerEnum,
  MixSidebarTriggerEnum,
} from '@/enums/menuEnum'

export enum HandlerEnum {
  CHANGE_LAYOUT,
  // menu
  MENU_HAS_DRAG,
  MENU_ACCORDION,
  MENU_TRIGGER,
  MENU_TOP_ALIGN,
  MENU_COLLAPSED,
  MENU_WIDTH,
  MENU_SHOW_SIDEBAR,
  MENU_FIXED,
  MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE,
  MENU_TRIGGER_MIX_SIDEBAR,
  MENU_FIXED_MIX_SIDEBAR,
  // header
  HEADER_SHOW,
  HEADER_FIXED,
  HEADER_SEARCH,

  TABS_SHOW_QUICK,
  TABS_SHOW_REDO,
  TABS_SHOW,
  TABS_SHOW_FOLD,

  FULL_CONTENT,
  CONTENT_MODE,
  SHOW_BREADCRUMB,
  SHOW_BREADCRUMB_ICON,
  GRAY_MODE,
  COLOR_WEAK,
  SHOW_LOGO,
  SHOW_FOOTER,

  ROUTER_TRANSITION,
  OPEN_PROGRESS,
  OPEN_PAGE_LOADING,
  OPEN_ROUTE_TRANSITION,
}

export const contentModeOptions = [
  {
    value: ContentEnum.FULL,
    label: '流式',
  },
  {
    value: ContentEnum.FIXED,
    label: '定宽',
  },
]

export const topMenuAlignOptions = [
  {
    value: TopMenuAlignEnum.CENTER,
    label: '居中',
  },
  {
    value: TopMenuAlignEnum.START,
    label: '左对齐',
  },
  {
    value: TopMenuAlignEnum.END,
    label: '右对齐',
  },
]

export const getMenuTriggerOptions = (hideTop: boolean) => {
  return [
    {
      value: TriggerEnum.NONE,
      label: '无',
    },
    {
      value: TriggerEnum.FOOTER,
      label: '底部',
    },
    ...(hideTop
      ? []
      : [
          {
            value: TriggerEnum.HEADER,
            label: '顶部',
          },
        ]),
  ]
}

export const routerTransitionOptions = [
  RouterTransitionEnum.ZOOM_FADE,
  RouterTransitionEnum.FADE,
  RouterTransitionEnum.ZOOM_OUT,
  RouterTransitionEnum.FADE_SIDE,
  RouterTransitionEnum.FADE_BOTTOM,
  RouterTransitionEnum.FADE_SCALE,
].map((item) => {
  return {
    label: item,
    value: item,
  }
})

export const menuTypeList = [
  {
    title: '混合菜单',
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.SIDEBAR,
  },
  {
    title: '顶部菜单',
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.MIX,
  },
]

export const mixSidebarTriggerOptions = [
  {
    value: MixSidebarTriggerEnum.HOVER,
    label: '悬停',
  },
  {
    value: MixSidebarTriggerEnum.CLICK,
    label: '点击',
  },
]
