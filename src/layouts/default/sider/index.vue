<template>
  <Sider width="210">
    <LayoutMenu />
  </Sider>
</template>
<script lang="ts">
  import { Layout } from 'ant-design-vue'
  import LayoutMenu from '../menu/index.vue'
  export default defineComponent({
    name: 'SiderWrapper',
    components: { Sider: Layout.Sider, LayoutMenu },
    setup() {},
  })
</script>

<style lang="less" scoped></style>
