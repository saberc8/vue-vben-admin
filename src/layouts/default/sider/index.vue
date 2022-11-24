<template>
  <MixSider v-if="getIsMixSidebar" />
  <Sider v-else />
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  import Sider from './LayoutSider.vue'
  import MixSider from './MixSider.vue'

  import { useAppInject } from '@/hooks/web/useAppInject'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import { useDesign } from '@/hooks/web/useDesign'
  export default defineComponent({
    name: 'SiderWrapper',
    components: { Sider, MixSider },
    setup() {
      const { prefixCls } = useDesign('layout-sider-wrapper')
      const { getIsMobile } = useAppInject()
      const { setMenuSetting, getCollapsed, getMenuWidth, getIsMixSidebar } = useMenuSetting()

      function handleClose() {
        setMenuSetting({
          collapsed: true,
        })
      }

      return { prefixCls, getIsMobile, getCollapsed, handleClose, getMenuWidth, getIsMixSidebar }
    },
  })
</script>
<style lang="less"></style>
