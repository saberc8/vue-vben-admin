<template>
  <span @click="toggleCollapsed">
    <MenuUnfoldOutlined v-if="getCollapsed" /> <MenuFoldOutlined v-else />
  </span>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

  export default defineComponent({
    name: 'HeaderTrigger',
    components: { MenuUnfoldOutlined, MenuFoldOutlined },
    setup() {
      const { getCollapsed, toggleCollapsed } = useMenuSetting()
      return { getCollapsed, toggleCollapsed }
    },
  })
</script>
