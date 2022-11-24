<template>
  <LayoutHeader />
  <MultipleTabs v-if="getShowTabs" />
</template>
<script lang="ts">
  import { defineComponent, unref, computed } from 'vue'

  import LayoutHeader from './index.vue'
  import MultipleTabs from '../tabs/index.vue'
  import { useFullContent } from '@/hooks/web/useFullContent'
  import { useMultipleTabSetting } from '@/hooks/setting/useMultipleTabSetting'
  import { useDesign } from '@/hooks/web/useDesign'

  export default defineComponent({
    name: 'LayoutMultipleHeader',
    components: { LayoutHeader, MultipleTabs },
    setup() {
      const { prefixCls } = useDesign('layout-multiple-header')

      const { getFullContent } = useFullContent()

      const { getShowMultipleTab } = useMultipleTabSetting()

      const getShowTabs = computed(() => {
        return unref(getShowMultipleTab) && !unref(getFullContent)
      })

      return {
        prefixCls,
        getShowTabs,
      }
    },
  })
</script>
