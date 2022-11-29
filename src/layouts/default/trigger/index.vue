<template>
  <div @click.stop="toggleCollapsed" class="trigger">
    <DoubleRightOutlined v-if="getCollapsed" />
    <DoubleLeftOutlined v-else />
  </div>
</template>
<script lang="ts">
  import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons-vue'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

  export default defineComponent({
    name: 'LayoutTrigger',
    components: { DoubleRightOutlined, DoubleLeftOutlined },
    setup() {
      const { getCollapsed, toggleCollapsed } = useMenuSetting()
      return { getCollapsed, toggleCollapsed }
    },
  })
</script>

<style lang="less" scoped>
  .trigger {
    line-height: 48px;
    padding-right: 16px;
    cursor: pointer;
    transition: color 0.3s;
  }
</style>
