<template>
  <Sider />
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import Sider from './LayoutSider.vue'

  import { useAppInject } from '@/hooks/web/useAppInject'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  export default defineComponent({
    name: 'SiderWrapper',
    components: { Sider },
    setup() {
      const { getIsMobile } = useAppInject()
      const { setMenuSetting, getCollapsed, getMenuWidth, getIsMixSidebar } = useMenuSetting()

      function handleClose() {
        setMenuSetting({
          collapsed: true,
        })
      }

      return { getIsMobile, getCollapsed, handleClose, getMenuWidth, getIsMixSidebar }
    },
  })
</script>
