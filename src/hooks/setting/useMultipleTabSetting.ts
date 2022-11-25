import type { MultiTabsSetting } from '/#/config'

import { computed } from 'vue'

import { useAppStore } from '@/store/modules/app'

export function useMultipleTabSetting() {
  const appStore = useAppStore()

  const getShowMultipleTab = computed(() => appStore.getMultiTabsSetting.show)

  const getShowQuick = computed(() => appStore.getMultiTabsSetting.showQuick)

  function setMultipleTabSetting(multiTabsSetting: Partial<MultiTabsSetting>) {
    appStore.setProjectConfig({ multiTabsSetting })
  }
  return {
    setMultipleTabSetting,
    getShowMultipleTab,
    getShowQuick,
  }
}
