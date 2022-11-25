<template>
  <Sider />
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import Sider from './LayoutSider.vue'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  export default defineComponent({
    name: 'SiderWrapper',
    components: { Sider },
    setup() {
      const { setMenuSetting, getCollapsed, getMenuWidth } = useMenuSetting()

      function handleClose() {
        setMenuSetting({
          collapsed: true,
        })
      }

      return { getCollapsed, handleClose, getMenuWidth }
    },
  })
</script>
