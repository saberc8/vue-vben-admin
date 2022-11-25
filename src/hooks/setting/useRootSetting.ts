import type { ProjectConfig } from '/#/config'

import { computed } from 'vue'

import { useAppStore } from '@/store/modules/app'
import { ContentEnum } from '@/enums/appEnum'

type RootSetting = Omit<ProjectConfig, 'headerSetting' | 'menuSetting' | 'multiTabsSetting'>

export function useRootSetting() {
  const appStore = useAppStore()

  const getPageLoading = computed(() => appStore.getPageLoading)

  const getOpenKeepAlive = computed(() => appStore.getProjectConfig.openKeepAlive)

  const getSettingButtonPosition = computed(() => appStore.getProjectConfig.settingButtonPosition)

  const getCanEmbedIFramePage = computed(() => appStore.getProjectConfig.canEmbedIFramePage)

  const getPermissionMode = computed(() => appStore.getProjectConfig.permissionMode)

  const getContentMode = computed(() => appStore.getProjectConfig.contentMode)

  const getShowSettingButton = computed(() => appStore.getProjectConfig.showSettingButton)

  const getUseErrorHandle = computed(() => appStore.getProjectConfig.useErrorHandle)

  const getShowBreadCrumb = computed(() => appStore.getProjectConfig.showBreadCrumb)

  const getFullContent = computed(() => appStore.getProjectConfig.fullContent)

  const getLayoutContentMode = computed(() =>
    appStore.getProjectConfig.contentMode === ContentEnum.FULL
      ? ContentEnum.FULL
      : ContentEnum.FIXED,
  )

  function setRootSetting(setting: Partial<RootSetting>) {
    appStore.setProjectConfig(setting)
  }

  return {
    setRootSetting,
    getSettingButtonPosition,
    getFullContent,
    getLayoutContentMode,
    getPageLoading,
    getOpenKeepAlive,
    getCanEmbedIFramePage,
    getPermissionMode,
    getUseErrorHandle,
    getShowBreadCrumb,
    getShowSettingButton,
    getContentMode,
  }
}
