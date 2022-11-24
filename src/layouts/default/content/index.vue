<template>
  <div v-loading="getOpenPageLoading && getPageLoading">
    <PageLayout />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import PageLayout from '@/layouts/page/index.vue'
  import { useDesign } from '@/hooks/web/useDesign'
  import { useRootSetting } from '@/hooks/setting/useRootSetting'
  import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
  import { useContentViewHeight } from './useContentViewHeight'

  export default defineComponent({
    name: 'LayoutContent',
    components: { PageLayout },
    setup() {
      const { prefixCls } = useDesign('layout-content')
      const { getOpenPageLoading } = useTransitionSetting()
      const { getLayoutContentMode, getPageLoading } = useRootSetting()

      useContentViewHeight()
      return {
        prefixCls,
        getOpenPageLoading,
        getLayoutContentMode,
        getPageLoading,
      }
    },
  })
</script>
