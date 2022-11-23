<template>
  <h2 class="mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left">
    {{ getFormTitle }}
  </h2>
</template>
<script lang="ts" setup>
  import { computed, unref } from 'vue'

  import { LoginStateEnum, useLoginState } from './useLogin'

  const { getLoginState } = useLoginState()

  const getFormTitle = computed(() => {
    const titleObj = {
      [LoginStateEnum.LOGIN]: '登录',
    }
    return titleObj[unref(getLoginState)]
  })
</script>
