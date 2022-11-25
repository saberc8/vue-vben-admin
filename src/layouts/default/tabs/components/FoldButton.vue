<template>
  <span @click="handleFold">
    <Icon :icon="getIcon" />
  </span>
</template>
<script lang="ts">
  import { defineComponent, unref, computed } from 'vue'
  import { Icon } from '@/components/Icon'

  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import { triggerWindowResize } from '@/utils/event'

  export default defineComponent({
    name: 'FoldButton',
    components: { Icon },
    setup() {
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

      return { getIcon, handleFold }
    },
  })
</script>
