<template>
  <Header class="header111">
    <!-- left start -->
    <div>
      <!-- logo -->
      <LayoutTrigger />
      <LayoutBreadcrumb />
    </div>
    <!-- left end -->

    <FullScreen />

    <UserDropDown />

    <SettingDrawer />
  </Header>
</template>
<script lang="ts">
  import { Layout } from 'ant-design-vue'
  import LayoutTrigger from '../trigger/index.vue'
  import { useRootSetting } from '@/hooks/setting/useRootSetting'
  import { UserDropDown, LayoutBreadcrumb, FullScreen } from './components'
  import { useDesign } from '@/hooks/web/useDesign'

  import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'

  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      // eslint-disable-next-line vue/no-reserved-component-names
      Header: Layout.Header,
      LayoutTrigger,
      LayoutBreadcrumb,
      UserDropDown,
      FullScreen,
      SettingDrawer: createAsyncComponent(() => import('@/layouts/default/setting/index.vue'), {
        loading: true,
      }),
    },
    setup() {
      const { prefixCls } = useDesign('layout-header')

      const { getUseErrorHandle, getShowSettingButton } = useRootSetting()

      return {
        prefixCls,
        getUseErrorHandle,
        getShowSettingButton,
      }
    },
  })
</script>
<style lang="less">
  .header111 {
    background-color: #fff;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }
</style>
