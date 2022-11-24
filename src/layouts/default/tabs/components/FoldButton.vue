<template>
  <span :class="`${prefixCls}__extra-fold`" @click="handleFold">
    <Icon :icon="getIcon" />
  </span>
</template>
<script lang="ts">
  import { defineComponent, unref, computed } from 'vue'
  import { Icon } from '@/components/Icon'
  import { useDesign } from '@/hooks/web/useDesign'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import { triggerWindowResize } from '@/utils/event'

  export default defineComponent({
    name: 'FoldButton',
    components: { Icon },
    setup() {
      const { prefixCls } = useDesign('multiple-tabs-content')
      const { getShowMenu, setMenuSetting } = useMenuSetting()
      const getIsUnFold = computed(() => !unref(getShowMenu))

      const getIcon = computed(() =>
        unref(getIsUnFold) ? 'codicon:screen-normal' : 'codicon:screen-full',
      )

      function handleFold() {
        const isUnFold = unref(getIsUnFold)
        setMenuSetting({
          show: isUnFold,
          hidden: !isUnFold,
        })
        triggerWindowResize()
      }

      return { prefixCls, getIcon, handleFold }
    },
  })
</script>
