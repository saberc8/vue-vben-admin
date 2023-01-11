<template>
  <ProTable
    ref="proTable"
    :dataSource="dataSource"
    :columns="columns"
    :params="params"
    :searchForm="searchForm"
    :showForm="showForm"
    :getListFunc="getListFunc"
    :gridOptions="gridOptions"
  >
    <template #toolbar_title>
      <span style="font-weight: bold; font-size: 20px; color: #000">系统菜单表单</span>
    </template>
    <template #toolbar_buttons>
      <a-button type="primary" @click="addMenuData">
        <template #icon><PlusOutlined /></template>
        新增
      </a-button>
    </template>
  </ProTable>
</template>
<script lang="ts" setup>
  import ProTable from '@/components/ProTable/index.vue'
  import { demoListApi } from '@/api/demo/table'
  import { VxeGridPropTypes } from 'vxe-table'
  import { createVNode } from 'vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  const proTable = ref()
  console.log(proTable.value, 'proTable')
  const visible = ref<Boolean>(false)
  const getListFunc = demoListApi
  const columns: VxeGridPropTypes.Columns = [
    {
      type: 'seq',
      width: 60,
      treeNode: true, // 开启树图表
    },
    { field: 'id', title: 'ID', width: 80 },
    { field: 'pid', title: 'PID', width: 80 },
    { field: 'title', title: '标题' },
    { field: 'name', title: '名称' },
    { field: 'path', title: '路由' },
    { field: 'component', title: '组件' },
    { field: 'redirect', title: '父级定向' },
    { field: 'orderNo', title: '排序' },
    { field: 'icon', title: '图标' },
    { field: 'frameSrc', title: '内嵌iframe' },
    {
      field: 'ignoreKeepAlive',
      title: '是否缓存',
      showOverflow: true,
      showHeaderOverflow: true,
      width: 100,
      align: 'center',
      slots: {
        default: ({ row }) => {
          return createVNode(
            resolveComponent('a-tag'),
            {
              color: row.ignoreKeepAlive ? 'pink' : 'green',
            },
            () => (row.ignoreKeepAlive ? '否' : '是'),
          )
        },
      },
    },
  ]
  // 树状图表的示例
  const gridOptions = {
    treeConfig: {
      transform: true,
      rowField: 'id',
      parentField: 'pid',
    },
    seqConfig: {
      seqMethod: ({ row, rowIndex }) => {
        return row.pid === 0 ? rowIndex + 1 : ''
      },
    },
  }

  const showForm = true
  // 搜索区域
  const searchForm = [
    {
      label: '名称',
      field: 'name',
      type: 'input',
      componentProps: {
        placeholder: '请输入名称',
      },
    },
    {
      label: '菜单标题',
      field: 'title',
      type: 'input',
      componentProps: {
        placeholder: '请输入菜单标题',
      },
    },
    {
      label: '组件路径',
      field: 'path',
      type: 'input',
      componentProps: {
        placeholder: '请输入路由',
      },
    },
    {
      label: '名称',
      field: 'component',
      type: 'input',
      componentProps: {
        placeholder: '请输入组件路径',
      },
    },
    {
      label: '父级id',
      field: 'pid',
      type: 'input',
      componentProps: {
        placeholder: '请输入父级id',
      },
    },
  ]

  const params = ref({
    page: 1,
    size: 50,
  })
  let dataSource = ref<any>([])
  const addMenuData = () => {
    console.log('addMenuData')
    visible.value = true
  }
</script>
