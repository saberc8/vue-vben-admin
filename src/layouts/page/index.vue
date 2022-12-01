<template>
  <RouterView>
    <template #default="{ Component, route }">
      <keep-alive v-if="openCache" :include="getCaches">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
      <div v-else>
        <component :is="Component" :key="route.fullPath" />
      </div>
    </template>
  </RouterView>
</template>

<script lang="ts" setup>
  import { useRootSetting } from '@/hooks/setting/useRootSetting'
  import { useMultipleTabSetting } from '@/hooks/setting/useMultipleTabSetting'
  import { useMultipleTabStore } from '@/store/modules/multipleTab'
  const { getShowMultipleTab } = useMultipleTabSetting()
  const tabStore = useMultipleTabStore()
  const { getOpenKeepAlive } = useRootSetting()
  const openCache = computed(() => unref(getOpenKeepAlive) && unref(getShowMultipleTab))
  const getCaches = computed((): string[] => {
    if (!unref(getOpenKeepAlive)) {
      return []
    }
    return tabStore.getCachedTabList
  })
</script>
