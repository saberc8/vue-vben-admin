<template>
  <Dropdown
    :dropMenuList="getDropMenuList"
    :trigger="getTrigger"
    placement="bottom"
    overlayClassName="multiple-tabs__dropdown"
    @menu-event="handleMenuEvent"
  >
    <div @contextmenu="handleContext" v-if="getIsTabs">
      <span class="ml-1">{{ getTitle }}</span>
    </div>
    <span v-else @click="handleContext">
      <Icon icon="ion:chevron-down" />
    </span>
  </Dropdown>
</template>

<script lang="ts">
  import type { PropType } from 'vue'
  import type { RouteLocationNormalized } from 'vue-router'

  import { defineComponent, computed, unref } from 'vue'
  import { Dropdown } from '@/components/Dropdown/index'
  import { Icon } from '@/components/Icon'

  import { TabContentProps } from '../types'

  import { useTabDropdown } from '../useTabDropdown'

  export default defineComponent({
    name: 'TabContent',
    components: { Dropdown, Icon },
    props: {
      tabItem: {
        type: Object as PropType<RouteLocationNormalized>,
        default: null,
      },
      isExtra: Boolean,
    },
    setup(props) {
      const getTitle = computed(() => {
        const { tabItem: { meta } = {} } = props
        return meta && meta.title
      })

      const getIsTabs = computed(() => !props.isExtra)

      const getTrigger = computed((): ('contextmenu' | 'click' | 'hover')[] =>
        unref(getIsTabs) ? ['contextmenu'] : ['click'],
      )

      const { getDropMenuList, handleMenuEvent, handleContextMenu } = useTabDropdown(
        props as TabContentProps,
        getIsTabs,
      )

      function handleContext(e) {
        props.tabItem && handleContextMenu(props.tabItem)(e)
      }

      return {
        getDropMenuList,
        handleMenuEvent,
        handleContext,
        getTrigger,
        getIsTabs,
        getTitle,
      }
    },
  })
</script>
