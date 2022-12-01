<template>
  <Menu
    mode="inline"
    :selectedKeys="menuState.selectedKeys"
    :defaultSelectedKeys="menuState.defaultSelectedKeys"
    theme="dark"
    :openKeys="getOpenKeys"
    @open-change="handleOpenChange"
    @click="handleMenuClick"
    :subMenuOpenDelay="0.2"
  >
    <template v-for="item in items" :key="item.path">
      <BasicSubMenuItem :item="item" />
    </template>
  </Menu>
</template>
<script lang="ts" setup>
  import type { MenuState } from './types'
  import { Menu } from 'ant-design-vue'
  import BasicSubMenuItem from './components/BasicSubMenuItem.vue'
  import { useOpenKeys } from './useOpenKeys'
  import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router'
  import { isFunction } from '@/utils/is'
  import { basicProps } from './props'
  import { REDIRECT_NAME } from '@/router/constant'
  import { listenerRouteChange } from '@/logics/mitt/routeChange'
  import { getAllParentPath } from '@/router/helper/menuHelper'
  const props = defineProps({
    ...basicProps,
  })
  const emit = defineEmits(['menuClick'])

  const isClickGo = ref(false)
  const currentActiveMenu = ref('')
  const menuState = reactive<MenuState>({
    defaultSelectedKeys: [],
    openKeys: [],
    selectedKeys: [],
  })
  const { items } = toRefs(props)
  const { currentRoute } = useRouter()
  const { handleOpenChange, setOpenKeys, getOpenKeys } = useOpenKeys(menuState, items)
  console.log(handleOpenChange, setOpenKeys, getOpenKeys)
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
      (route || unref(currentRoute)).meta?.currentActiveMenu || (route || unref(currentRoute)).path
    setOpenKeys(path)
    if (unref(currentActiveMenu)) return
    const parentPaths = await getAllParentPath(props.items, path)
    console.log(parentPaths)
    menuState.selectedKeys = parentPaths
  }
</script>
<style lang="less"></style>
