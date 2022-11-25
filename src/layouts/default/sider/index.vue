<template>
  <Sider
    ref="sideRef"
    collapsible
    :collapsed="getCollapsed"
    :collapsedWidth="getCollapsedWidth"
    @breakpoint="onBreakpointChange"
    v-bind="getTriggerAttr"
  >
    <LayoutMenu />
  </Sider>
</template>
<script lang="ts">
  import { Layout } from 'ant-design-vue'
  import LayoutMenu from '../menu/index.vue'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import { useTrigger, useSiderEvent } from './useLayoutSider'

  export default defineComponent({
    name: 'SiderWrapper',
    components: { Sider: Layout.Sider, LayoutMenu },
    setup() {
      const sideRef = ref<ElRef>(null)
      const { getCollapsed } = useMenuSetting()
      const { getTriggerAttr, getShowTrigger } = useTrigger()
      const { getCollapsedWidth, onBreakpointChange } = useSiderEvent()
      return {
        sideRef,
        getTriggerAttr,
        getCollapsedWidth,
        getCollapsed,
        onBreakpointChange,
        getShowTrigger,
      }
    },
  })
</script>
