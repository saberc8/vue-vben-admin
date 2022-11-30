<template>
  <Spin :spinning="loading" size="large">
    <iframe :src="frameSrc" ref="frameRef" @load="hideLoading"></iframe>
  </Spin>
</template>
<script lang="ts" setup>
  import { Spin } from 'ant-design-vue'

  defineProps({
    frameSrc: {
      type: String,
      default: '',
    },
  })

  const loading = ref(true)
  const frameRef = ref<HTMLFrameElement>()
  function hideLoading() {
    loading.value = false
  }
</script>
