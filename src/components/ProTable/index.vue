<template>
  <ProForm></ProForm>
  <ProBody :columns="columns" :dataSource="dataSource"></ProBody>
</template>

<script lang="ts" setup>
  import ProForm from './components/ProForm/index.vue'
  import ProBody from './components/ProBody/index.vue'
  const props = defineProps<{
    dataSource: {
      type: Object
      default: {}
    }
    columns: Array<any>
  }>()
  console.log(props, 'pro-table')
  // console.log(props.dataSource, 'pro-table-dataSource')
  // console.log(props.columns, 'pro-table-columns')
</script>

<style lang="less" scoped></style>
