<template>
  <span :class="`${prefixCls}- flex items-center `">
    <Icon v-if="getIcon" :icon="getIcon" :size="18" :class="`${prefixCls}-wrapper__icon mr-2`" />
    {{ getI18nName }}
  </span>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'

  import Icon from '@/components/Icon/index'

  import { useDesign } from '@/hooks/web/useDesign'
  import { contentProps } from '../props'

  export default defineComponent({
    name: 'MenuItemContent',
    components: {
      Icon,
    },
    props: contentProps,
    setup(props) {
      const { prefixCls } = useDesign('basic-menu-item-content')
      const getI18nName = computed(() => props.item?.name)
      const getIcon = computed(() => props.item?.icon)

      return {
        prefixCls,
        getI18nName,
        getIcon,
      }
    },
  })
</script>
