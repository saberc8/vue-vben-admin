<template>
  <ProTable :dataSource="dataSource" :columns="columns" />
</template>
<script lang="ts" setup>
  import ProTable from '@/components/ProTable/index.vue'
  import { demoListApi } from '@/api/demo/table'
  import { DemoListItem } from '@/api/demo/model/tableModel'
  console.log(typeof demoListApi)
  const columns = [
    { type: 'seq', width: 50 },
    { field: 'name', title: 'name' },
    { field: 'name1', title: 'sex', showHeaderOverflow: true },
    { field: 'name2', title: 'Address', showOverflow: true },
  ]

  const params: DemoListItem = {
    id: '',
    beginTime: '',
    endTime: '',
    address: '',
    name: '1',
    no: 0,
    status: 1,
  }
  let dataSource: any = ref([])
  const t = async (params) => {
    const res = await demoListApi(params)
    console.log(res)
    dataSource.value = res.items
  }
  t(params)
</script>
