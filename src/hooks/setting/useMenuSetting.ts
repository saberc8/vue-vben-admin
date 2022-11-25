import type { MenuSetting } from '/#/config'

import { computed, unref, ref } from 'vue'

import { useAppStore } from '@/store/modules/app'

import { SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH } from '@/enums/appEnum'
import { useFullContent } from '@/hooks/web/useFullContent'

const mixSideHasChildren = ref(false)

export function useMenuSetting() {
  const { getFullContent: fullContent } = useFullContent()
  const appStore = useAppStore()

  const getShowSidebar = computed(() => {
    return unref(getSplit) || (unref(getShowMenu) && !unref(fullContent))
  })

  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed)

  const getMenuType = computed(() => appStore.getMenuSetting.type)

  const getMenuMode = computed(() => appStore.getMenuSetting.mode)

  const getMenuFixed = computed(() => appStore.getMenuSetting.fixed)

  const getShowMenu = computed(() => appStore.getMenuSetting.show)

  const getMenuHidden = computed(() => appStore.getMenuSetting.hidden)

  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth)

  const getTrigger = computed(() => appStore.getMenuSetting.trigger)

  const getSplit = computed(() => appStore.getMenuSetting.split)

  const getMenuBgColor = computed(() => appStore.getMenuSetting.bgColor)

  const getMixSideTrigger = computed(() => appStore.getMenuSetting.mixSideTrigger)

  const getCanDrag = computed(() => appStore.getMenuSetting.canDrag)

  const getAccordion = computed(() => appStore.getMenuSetting.accordion)

  const getMixSideFixed = computed(() => appStore.getMenuSetting.mixSideFixed)
  const getCloseMixSidebarOnChange = computed(() => appStore.getMenuSetting.closeMixSidebarOnChange)

  const getCollapsedShowTitle = computed(() => appStore.getMenuSetting.collapsedShowTitle)

  const getRealWidth = computed(() => {
    return unref(getCollapsed) ? unref(getMiniWidthNumber) : unref(getMenuWidth)
  })

  const getMiniWidthNumber = computed(() => {
    const { collapsedShowTitle, siderHidden } = appStore.getMenuSetting
    return siderHidden ? 0 : collapsedShowTitle ? SIDE_BAR_SHOW_TIT_MINI_WIDTH : SIDE_BAR_MINI_WIDTH
  })

  // Set menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting })
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    })
  }
  return {
    setMenuSetting,
    toggleCollapsed,
    getMenuFixed,
    getRealWidth,
    getMenuType,
    getMenuMode,
    getShowMenu,
    getCollapsed,
    getMiniWidthNumber,
    getMenuWidth,
    getTrigger,
    getSplit,
    getCanDrag,
    getCollapsedShowTitle,
    getAccordion,
    getMenuHidden,
    getMenuBgColor,
    getShowSidebar,
    getCloseMixSidebarOnChange,
    getMixSideTrigger,
    getMixSideFixed,
    mixSideHasChildren,
  }
}
