<template>
  <div :class="`${prefixCls}-dom`" :style="getDomStyle"></div>
  <div
    v-click-outside="handleClickOutside"
    :style="getWrapStyle"
    :class="[
      prefixCls,
      {
        open: openMenu,
        mini: getCollapsed,
      },
    ]"
    v-bind="getMenuEvents"
  >
    <AppLogo :showTitle="false" :class="`${prefixCls}-logo`" />

    <LayoutTrigger :class="`${prefixCls}-trigger`" />

    <ScrollContainer>
      <ul :class="`${prefixCls}-module`">
        <li
          :class="[
            `${prefixCls}-module__item `,
            {
              [`${prefixCls}-module__item--active`]: item.path === activePath,
            },
          ]"
          v-bind="getItemEvents(item)"
          v-for="item in menuModules"
          :key="item.path"
        >
          <SimpleMenuTag :item="item" collapseParent dot />
          <Icon
            :class="`${prefixCls}-module__icon`"
            :size="getCollapsed ? 16 : 20"
            :icon="item.icon || (item.meta && item.meta.icon)"
          />
          <p :class="`${prefixCls}-module__name`">
            {{ item.name }}
          </p>
        </li>
      </ul>
    </ScrollContainer>

    <div :class="`${prefixCls}-menu-list`" ref="sideRef" :style="getMenuStyle">
      <div
        v-show="openMenu"
        :class="[
          `${prefixCls}-menu-list__title`,
          {
            show: openMenu,
          },
        ]"
      >
        <span class="text"> {{ title }}</span>
        <Icon
          :size="16"
          :icon="getMixSideFixed ? 'ri:pushpin-2-fill' : 'ri:pushpin-2-line'"
          class="pushpin"
          @click="handleFixedMenu"
        />
      </div>
      <ScrollContainer :class="`${prefixCls}-menu-list__content`">
        <SimpleMenu :items="childrenMenus" mixSider @menu-click="handleMenuClick" />
      </ScrollContainer>
      <div
        v-show="getShowDragBar && openMenu"
        :class="`${prefixCls}-drag-bar`"
        ref="dragBarRef"
      ></div>
    </div>
  </div>
</template>
<script lang="ts">
  import type { Menu } from '@/router/types'
  import type { CSSProperties } from 'vue'
  import { computed, defineComponent, onMounted, ref, unref, watch } from 'vue'
  import type { RouteLocationNormalized } from 'vue-router'
  import { ScrollContainer } from '@/components/Container'
  import { SimpleMenu, SimpleMenuTag } from '@/components/SimpleMenu'
  import { Icon } from '@/components/Icon'
  import { AppLogo } from '@/components/Application'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import { usePermissionStore } from '@/store/modules/permission'
  import { useDragLine } from './useLayoutSider'
  import { useGlobSetting } from '@/hooks/setting'
  import { useDesign } from '@/hooks/web/useDesign'

  import { useGo } from '@/hooks/web/usePage'
  import { SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH } from '@/enums/appEnum'
  import clickOutside from '@/directives/clickOutside'
  import { getChildrenMenus, getCurrentParentPath, getShallowMenus } from '@/router/menus'
  import { listenerRouteChange } from '@/logics/mitt/routeChange'
  import LayoutTrigger from '../trigger/index.vue'

  export default defineComponent({
    name: 'LayoutMixSider',
    components: {
      ScrollContainer,
      AppLogo,
      SimpleMenu,
      Icon,
      LayoutTrigger,
      SimpleMenuTag,
    },
    directives: {
      clickOutside,
    },
    setup() {
      let menuModules = ref<Menu[]>([])
      const activePath = ref('')
      const childrenMenus = ref<Menu[]>([])
      const openMenu = ref(false)
      const dragBarRef = ref<ElRef>(null)
      const sideRef = ref<ElRef>(null)
      const currentRoute = ref<Nullable<RouteLocationNormalized>>(null)

      const { prefixCls } = useDesign('layout-mix-sider')
      const go = useGo()

      const {
        getMenuWidth,
        getCanDrag,
        getCloseMixSidebarOnChange,
        getMixSideTrigger,
        getRealWidth,
        getMixSideFixed,
        mixSideHasChildren,
        setMenuSetting,
        getIsMixSidebar,
        getCollapsed,
      } = useMenuSetting()

      const { title } = useGlobSetting()
      const permissionStore = usePermissionStore()

      useDragLine(sideRef, dragBarRef, true)

      const getMenuStyle = computed((): CSSProperties => {
        return {
          width: unref(openMenu) ? `${unref(getMenuWidth)}px` : 0,
          left: `${unref(getMixSideWidth)}px`,
        }
      })

      const getIsFixed = computed(() => {
        /* eslint-disable-next-line */
        mixSideHasChildren.value = unref(childrenMenus).length > 0
        const isFixed = unref(getMixSideFixed) && unref(mixSideHasChildren)
        if (isFixed) {
          /* eslint-disable-next-line */
          openMenu.value = true
        }
        return isFixed
      })

      const getMixSideWidth = computed(() => {
        return unref(getCollapsed) ? SIDE_BAR_MINI_WIDTH : SIDE_BAR_SHOW_TIT_MINI_WIDTH
      })

      const getDomStyle = computed((): CSSProperties => {
        const fixedWidth = unref(getIsFixed) ? unref(getRealWidth) : 0
        const width = `${unref(getMixSideWidth) + fixedWidth}px`
        return getWrapCommonStyle(width)
      })

      const getWrapStyle = computed((): CSSProperties => {
        const width = `${unref(getMixSideWidth)}px`
        return getWrapCommonStyle(width)
      })

      const getMenuEvents = computed(() => {
        return !unref(getMixSideFixed)
          ? {
              onMouseleave: () => {
                setActive(true)
                closeMenu()
              },
            }
          : {}
      })

      const getShowDragBar = computed(() => unref(getCanDrag))

      onMounted(async () => {
        menuModules.value = await getShallowMenus()
      })

      // Menu changes
      watch(
        [() => permissionStore.getLastBuildMenuTime, () => permissionStore.getBackMenuList],
        async () => {
          menuModules.value = await getShallowMenus()
        },
        {
          immediate: true,
        },
      )

      listenerRouteChange((route) => {
        currentRoute.value = route
        setActive(true)
        if (unref(getCloseMixSidebarOnChange)) {
          closeMenu()
        }
      })

      function getWrapCommonStyle(width: string): CSSProperties {
        return {
          width,
          maxWidth: width,
          minWidth: width,
          flex: `0 0 ${width}`,
        }
      }

      // Process module menu click
      async function handleModuleClick(path: string, hover = false) {
        const children = await getChildrenMenus(path)
        if (unref(activePath) === path) {
          if (!hover) {
            if (!unref(openMenu)) {
              openMenu.value = true
            } else {
              closeMenu()
            }
          } else {
            if (!unref(openMenu)) {
              openMenu.value = true
            }
          }
          if (!unref(openMenu)) {
            setActive()
          }
        } else {
          openMenu.value = true
          activePath.value = path
        }

        if (!children || children.length === 0) {
          if (!hover) go(path)
          childrenMenus.value = []
          closeMenu()
          return
        }
        childrenMenus.value = children
      }

      // Set the currently active menu and submenu
      async function setActive(setChildren = false) {
        const path = currentRoute.value?.path
        if (!path) return
        activePath.value = await getCurrentParentPath(path)
        if (unref(getIsMixSidebar)) {
          const activeMenu = unref(menuModules).find((item) => item.path === unref(activePath))
          const p = activeMenu?.path
          if (p) {
            const children = await getChildrenMenus(p)
            if (setChildren) {
              childrenMenus.value = children

              if (unref(getMixSideFixed)) {
                openMenu.value = children.length > 0
              }
            }
            if (children.length === 0) {
              childrenMenus.value = []
            }
          }
        }
      }

      function handleMenuClick(path: string) {
        go(path)
      }

      function handleClickOutside() {
        setActive(true)
        closeMenu()
      }

      function getItemEvents(item: Menu) {
        if (unref(getMixSideTrigger) === 'hover') {
          return {
            onMouseenter: () => handleModuleClick(item.path, true),
            onClick: async () => {
              const children = await getChildrenMenus(item.path)
              if (item.path && (!children || children.length === 0)) go(item.path)
            },
          }
        }
        return {
          onClick: () => handleModuleClick(item.path),
        }
      }

      function handleFixedMenu() {
        setMenuSetting({
          mixSideFixed: !unref(getIsFixed),
        })
      }

      // Close menu
      function closeMenu() {
        if (!unref(getIsFixed)) {
          openMenu.value = false
        }
      }

      return {
        prefixCls,
        menuModules,
        handleModuleClick: handleModuleClick,
        activePath,
        childrenMenus: childrenMenus,
        getShowDragBar,
        handleMenuClick,
        getMenuStyle,
        handleClickOutside,
        sideRef,
        dragBarRef,
        title,
        openMenu,
        getItemEvents,
        getMenuEvents,
        getDomStyle,
        handleFixedMenu,
        getMixSideFixed,
        getWrapStyle,
        getCollapsed,
      }
    },
  })
</script>
