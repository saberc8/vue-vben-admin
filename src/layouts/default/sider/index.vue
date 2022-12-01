<template>
  <Sider width="210">
    <LayoutMenu />
  </Sider>
</template>
<script lang="ts" setup>
  import { Layout } from 'ant-design-vue'
  import LayoutMenu from '../menu/index.vue'
  const Sider = Layout.Sider
</script>
