<template>
  <div>
    <Tabs
      type="editable-card"
      size="small"
      :animated="false"
      :hideAdd="true"
      :tabBarGutter="3"
      :activeKey="activeKeyRef"
      @change="handleChange"
      @edit="handleEdit"
    >
      <template v-for="item in getTabsState" :key="item.query ? item.fullPath : item.path">
        <TabPane :closable="!(item && item.meta && item.meta.affix)">
          <template #tab>
            <div>{{ item.meta?.title }}</div>
          </template>
        </TabPane>
      </template>
    </Tabs>
  </div>
</template>

<script lang="ts">
  import type { RouteLocationNormalized, RouteMeta } from 'vue-router'
  import { Tabs } from 'ant-design-vue'
  import { useGo } from '@/hooks/web/usePage'
  import { useMultipleTabStore } from '@/store/modules/multipleTab'
  import { useUserStore } from '@/store/modules/user'
  import { initAffixTabs, useTabsDrag } from './useMultipleTabs'
  import { REDIRECT_NAME } from '@/router/constant'
  import { listenerRouteChange } from '@/logics/mitt/routeChange'

  import { useRouter } from 'vue-router'

  export default defineComponent({
    name: 'MultipleTabs',
    components: {
      Tabs,
      TabPane: Tabs.TabPane,
    },
    setup() {
      const affixTextList = initAffixTabs()
      const activeKeyRef = ref('')
      useTabsDrag(affixTextList)
      const tabStore = useMultipleTabStore()
      const userStore = useUserStore()
      const router = useRouter()
      const go = useGo()
      const getTabsState = computed(() => {
        return tabStore.getTabList.filter((item) => !item.meta?.hideTab)
      })

      const unClose = computed(() => unref(getTabsState).length === 1)

      listenerRouteChange((route) => {
        const { name } = route
        if (name === REDIRECT_NAME || !route || !userStore.getToken) {
          return
        }

        const { path, fullPath, meta = {} } = route
        const { currentActiveMenu, hideTab } = meta as RouteMeta
        const isHide = !hideTab ? null : currentActiveMenu
        const p = isHide || fullPath || path
        if (activeKeyRef.value !== p) {
          activeKeyRef.value = p as string
        }

        if (isHide) {
          const findParentRoute = router.getRoutes().find((item) => item.path === currentActiveMenu)
          findParentRoute && tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized)
        } else {
          tabStore.addTab(unref(route))
        }
      })

      function handleChange(activeKey: any) {
        activeKeyRef.value = activeKey
        go(activeKey, false)
      }

      // Close the current tab
      function handleEdit(targetKey: string) {
        // Added operation to hide, currently only use delete operation
        if (unref(unClose)) {
          return
        }
        tabStore.closeTabByKey(targetKey, router)
      }
      return {
        handleEdit,
        handleChange,
        activeKeyRef,
        getTabsState,
      }
    },
  })
</script>
<style lang="less"></style>
