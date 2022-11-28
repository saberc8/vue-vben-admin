<template>
  <a-layout class="layout">
    <LayoutSideBar />
    <a-layout>
      <a-layout-header class="layout-header"><LayoutHeader /></a-layout-header>
      <a-layout-content class="layout-content"><LayoutContent /></a-layout-content>
      <a-layout-footer class="layout-footer">Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
  import { Layout } from 'ant-design-vue'
  import LayoutContent from './content/index.vue'
  import LayoutSideBar from './sider/index.vue'
  import LayoutHeader from './header/index.vue'
  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      LayoutContent,
      LayoutSideBar,
      LayoutHeader,
      ALayout: Layout,
    },
    setup() {},
  })
</script>

<style lang="less" scoped>
  .layout {
    min-height: 100vh;

    &-sider {
      background: #fff;
    }

    &-header {
      background: rgb(255, 255, 255);
      height: 48px;
      padding: 0;
      box-shadow: 0 8px 24px -2px rgb(0 0 0 / 5%);
    }
  }
</style>
