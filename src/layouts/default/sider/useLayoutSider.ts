import type { Ref } from 'vue'

import { computed, unref } from 'vue'

import { TriggerEnum } from '@/enums/menuEnum'

import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useAppStore } from '@/store/modules/app'

/**
 * Handle related operations of menu events
 */
export function useSiderEvent() {
  const appStore = useAppStore()
  const { getMiniWidthNumber } = useMenuSetting()

  const getCollapsedWidth = computed(() => {
    return unref(getMiniWidthNumber)
  })

  function onBreakpointChange(broken: boolean) {
    appStore.setProjectConfig({
      menuSetting: {
        siderHidden: broken,
      },
    })
  }

  return { getCollapsedWidth, onBreakpointChange }
}

/**
 * Handle related operations of menu folding
 */
export function useTrigger(getIsMobile: Ref<boolean>) {
  const { getTrigger, getSplit } = useMenuSetting()

  const getShowTrigger = computed(() => {
    const trigger = unref(getTrigger)

    return (
      trigger !== TriggerEnum.NONE &&
      !unref(getIsMobile) &&
      (trigger === TriggerEnum.FOOTER || unref(getSplit))
    )
  })

  const getTriggerAttr = computed(() => {
    if (unref(getShowTrigger)) {
      return {}
    }
    return {
      trigger: null,
    }
  })

  return { getTriggerAttr, getShowTrigger }
}
