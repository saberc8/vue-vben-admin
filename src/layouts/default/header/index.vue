<template>
  <div class="header">
    <div class="header-left">
      <LayoutTrigger />
      <LayoutBreadcrumb />
    </div>
    <div class="header-right">
      <FullScreen />
      <UserDropDown />
    </div>
    <MultipleTabs class="header-tabs" />
  </div>
</template>
<script lang="ts">
  import LayoutTrigger from '../trigger/index.vue'
  import { useRootSetting } from '@/hooks/setting/useRootSetting'
  import { UserDropDown, LayoutBreadcrumb, FullScreen } from './components'
  import MultipleTabs from '../tabs/index.vue'
  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      LayoutTrigger,
      LayoutBreadcrumb,
      UserDropDown,
      FullScreen,
      MultipleTabs,
    },
    setup() {
      const { getUseErrorHandle, getShowSettingButton } = useRootSetting()

      return {
        getUseErrorHandle,
        getShowSettingButton,
      }
    },
  })
</script>
<style lang="less" scoped>
  .header {
    display: flex;
    position: relative;
    justify-content: space-between;

    &-left {
      display: flex;
      align-items: center;
    }

    &-right {
      display: flex;
      align-items: center;
    }

    &-tabs {
      position: absolute;
      top: 40px;
      left: 0;
      right: 0;
    }
  }
</style>
