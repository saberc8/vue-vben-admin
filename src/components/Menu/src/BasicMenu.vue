<template>
  <Menu
    :selectedKeys="selectedKeys"
    :defaultSelectedKeys="defaultSelectedKeys"
    :mode="mode"
    :openKeys="getOpenKeys"
    :inlineIndent="inlineIndent"
    @open-change="handleOpenChange"
    @click="handleMenuClick"
    :subMenuOpenDelay="0.2"
    v-bind="getInlineCollapseOptions"
  >
    <template v-for="item in items" :key="item.path">
      <BasicSubMenuItem :item="item" />
    </template>
  </Menu>
</template>
<script lang="ts">
  import type { MenuState } from './types'
  import { Menu } from 'ant-design-vue'
  import BasicSubMenuItem from './components/BasicSubMenuItem.vue'
  import { MenuModeEnum } from '@/enums/menuEnum'
  import { useOpenKeys } from './useOpenKeys'
  import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router'
  import { isFunction } from '@/utils/is'
  import { basicProps } from './props'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import { REDIRECT_NAME } from '@/router/constant'
  import { listenerRouteChange } from '@/logics/mitt/routeChange'
  import { getAllParentPath } from '@/router/helper/menuHelper'

  export default defineComponent({
    name: 'BasicMenu',
    components: {
      // eslint-disable-next-line vue/no-reserved-component-names
      Menu,
      BasicSubMenuItem,
    },
    props: basicProps,
    emits: ['menuClick'],
    setup(props, { emit }) {
      const isClickGo = ref(false)
      const currentActiveMenu = ref('')

      const menuState = reactive<MenuState>({
        defaultSelectedKeys: [],
        openKeys: [],
        selectedKeys: [],
        collapsedOpenKeys: [],
      })

      const { items, mode, accordion } = toRefs(props)

      const { getCollapsed } = useMenuSetting()

      const { currentRoute } = useRouter()

      const { handleOpenChange, setOpenKeys, getOpenKeys } = useOpenKeys(
        menuState,
        items,
        mode as any,
        accordion,
      )

      const getInlineCollapseOptions = computed(() => {
        const isInline = props.mode === MenuModeEnum.INLINE

        const inlineCollapseOptions: { inlineCollapsed?: boolean } = {}
        if (isInline) {
          inlineCollapseOptions.inlineCollapsed = unref(getCollapsed)
        }
        return inlineCollapseOptions
      })

      listenerRouteChange((route) => {
        if (route.name === REDIRECT_NAME) return
        handleMenuChange(route)
        currentActiveMenu.value = route.meta?.currentActiveMenu as string

        if (unref(currentActiveMenu)) {
          menuState.selectedKeys = [unref(currentActiveMenu)]
          setOpenKeys(unref(currentActiveMenu))
        }
      })

      async function handleMenuClick(key) {
        const { beforeClickFn } = props
        if (beforeClickFn && isFunction(beforeClickFn)) {
          const flag = await beforeClickFn(key)
          if (!flag) return
        }
        emit('menuClick', key)

        isClickGo.value = true
        menuState.selectedKeys = [key]
      }

      async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
        if (unref(isClickGo)) {
          isClickGo.value = false
          return
        }
        const path =
          (route || unref(currentRoute)).meta?.currentActiveMenu ||
          (route || unref(currentRoute)).path
        setOpenKeys(path)
        if (unref(currentActiveMenu)) return
        const parentPaths = await getAllParentPath(props.items, path)
        menuState.selectedKeys = parentPaths
      }

      return {
        handleMenuClick,
        getInlineCollapseOptions,
        handleOpenChange,
        getOpenKeys,
        ...toRefs(menuState),
      }
    },
  })
</script>
<style lang="less"></style>
