<template>
  <ConfigProvider :locale="locale">
    <RouterView />
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue'
  import { useTitle } from '@/hooks/web/useTitle'
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import dayjs from 'dayjs'
  import 'dayjs/locale/zh-cn'
  dayjs.locale('zh-cn')
  const locale = zhCN
  useTitle()
</script>
