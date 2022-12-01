<template>
  <div class="multiple-tabbar">
    <Tabs
      type="editable-card"
      size="small"
      :animated="false"
      :hideAdd="true"
      :tabBarGutter="3"
      :activeKey="activeKeyRef"
      @change="handleChange"
      @edit="handleEdit"
      :tabBarStyle="tabBarStyle"
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

<script lang="ts" setup>
  import type { RouteLocationNormalized, RouteMeta } from 'vue-router'
  import { Tabs, TabPane } from 'ant-design-vue'
  import { useGo } from '@/hooks/web/usePage'
  import { useMultipleTabStore } from '@/store/modules/multipleTab'
  import { useUserStore } from '@/store/modules/user'
  import { initAffixTabs, useTabsDrag } from './useMultipleTabs'
  import { REDIRECT_NAME } from '@/router/constant'
  import { listenerRouteChange } from '@/logics/mitt/routeChange'

  import { useRouter } from 'vue-router'

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
  const tabBarStyle = {
    margin: '0px',
  }
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
</script>
<style lang="less">
  .multiple-tabbar {
    z-index: 10;
    height: 32px;
    line-height: 32px;
    background-color: rgb(255, 255, 255);
    border-bottom: 1px solid #eee;

    .ant-tabs-small {
      height: 32px;
    }

    .ant-tabs.ant-tabs-card {
      .ant-tabs-nav {
        padding-top: 2px;
        height: 32px;
        margin: 0;
        background-color: rgb(255, 255, 255);
        border: 0;
        box-shadow: none;

        .ant-tabs-nav-container {
          height: 32px;
          padding-top: 2px;
        }

        .ant-tabs-tab {
          height: calc(32 - 2px);
          padding-right: 12px;
          line-height: calc(32 - 2px);
          color: #fff;
          background-color: #1890ff;
          transition: none;

          &:hover {
            .ant-tabs-tab-remove {
              opacity: 1;
            }
          }

          .ant-tabs-tab-remove {
            width: 8px;
            height: 28px;
            font-size: 12px;
            color: inherit;
            opacity: 0;
            transition: none;
            margin-left: 2px;
            margin-right: -4px;

            &:hover {
              svg {
                width: 0.8em;
              }
            }
          }

          svg {
            fill: #fff;
          }
        }

        .ant-tabs-tab:not(.ant-tabs-tab-active) {
          &:hover {
            color: rgb(0, 0, 0);
          }
        }

        .ant-tabs-tab-active {
          position: relative;
          padding-left: 18px;
          background: #fff;
          border: 0;
          transition: none;

          span {
            color: rgb(0, 0, 0) !important;
          }

          .ant-tabs-tab-remove {
            opacity: 1;
          }

          svg {
            width: 0.7em;
            fill: rgb(255, 255, 255);
          }
        }
      }

      .ant-tabs-nav > div:nth-child(1) {
        padding: 0 6px;

        .ant-tabs-tab {
          margin-right: 3px !important;
        }
      }
    }

    .ant-tabs-tab:not(.ant-tabs-tab-active) {
      .anticon-close {
        font-size: 12px;

        svg {
          width: 0.6em;
        }
      }
    }

    .ant-dropdown-trigger {
      display: inline-flex;
    }

    &--hide-close {
      .ant-tabs-tab-remove {
        opacity: 0 !important;
      }
    }

    &-content {
      &__extra-quick,
      &__extra-redo,
      &__extra-fold {
        display: inline-block;
        width: 36px;
        height: 32px;
        line-height: 32px;
        color: #fff;
        text-align: center;
        cursor: pointer;
        border-left: 1px solid #eee;

        &:hover {
          color: #fff;
        }

        span[role='img'] {
          transform: rotate(90deg);
        }
      }

      &__extra-redo {
        span[role='img'] {
          transform: rotate(0deg);
        }
      }

      &__info {
        display: inline-block;
        width: 100%;
        height: 30px;
        padding-left: 0;
        margin-left: -10px;
        font-size: 12px;
        cursor: pointer;
        user-select: none;
      }
    }
  }

  .ant-tabs-dropdown-menu {
    &-title-content {
      display: flex;
      align-items: center;

      .multiple-tabbar {
        &-content__info {
          width: auto;
          margin-left: 0;
          line-height: 28px;
        }
      }
    }

    &-item-remove {
      margin-left: auto;
    }
  }

  .multiple-tabs__dropdown {
    .ant-dropdown-content {
      width: 172px;
    }
  }
</style>
