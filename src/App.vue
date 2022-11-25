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

<style>
  /* 滚动条 */
  body *::-webkit-scrollbar {
    width: 4px;
    height: 5px;
  }

  body *::-webkit-scrollbar-track {
    background: #fff;
    border-radius: 2px;
  }

  body *::-webkit-scrollbar-thumb {
    background: rgb(205, 206, 206);

    border-radius: 10px;
  }

  body *::-webkit-scrollbar-thumb:hover {
    background: #333;
  }

  body *::-webkit-scrollbar-corner {
    background: #fff;
  }
</style>
