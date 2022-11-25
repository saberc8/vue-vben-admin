<template>
  <Sider
    v-show="showClassSideBarRef"
    ref="sideRef"
    breakpoint="lg"
    collapsible
    :width="getMenuWidth"
    :collapsed="getCollapsed"
    :collapsedWidth="getCollapsedWidth"
    @breakpoint="onBreakpointChange"
    :trigger="getTrigger"
    v-bind="getTriggerAttr"
  >
    <template #trigger v-if="getShowTrigger">
      <LayoutTrigger />
    </template>
    <LayoutMenu />
  </Sider>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, unref, CSSProperties, h } from 'vue'

  import { Layout } from 'ant-design-vue'
  import LayoutMenu from '../menu/index.vue'
  import LayoutTrigger from '@/layouts/default/trigger/index.vue'

  import { MenuModeEnum } from '@/enums/menuEnum'

  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import { useTrigger, useSiderEvent } from './useLayoutSider'

  export default defineComponent({
    name: 'LayoutSideBar',
    components: { Sider: Layout.Sider, LayoutMenu, LayoutTrigger },
    setup() {
      const sideRef = ref<ElRef>(null)

      const {
        getCollapsed,
        getMenuWidth,
        getSplit,
        getRealWidth,
        getMenuHidden,
        getMenuFixed,
        toggleCollapsed,
      } = useMenuSetting()

      const { getTriggerAttr, getShowTrigger } = useTrigger()

      const { getCollapsedWidth, onBreakpointChange } = useSiderEvent()

      const getMode = computed(() => {
        return unref(getSplit) ? MenuModeEnum.INLINE : null
      })

      const showClassSideBarRef = computed(() => {
        return unref(getSplit) ? !unref(getMenuHidden) : true
      })

      const getHiddenDomStyle = computed((): CSSProperties => {
        const width = `${unref(getRealWidth)}px`
        return {
          width: width,
          overflow: 'hidden',
          flex: `0 0 ${width}`,
          maxWidth: width,
          minWidth: width,
          transition: 'all 0.2s',
        }
      })

      // 在此处使用计算量可能会导致sider异常
      // andv 更新后，如果trigger插槽可用，则此处代码可废弃
      const getTrigger = h(LayoutTrigger)

      return {
        sideRef,
        getHiddenDomStyle,
        getTrigger,
        getTriggerAttr,
        getCollapsedWidth,
        getMenuFixed,
        showClassSideBarRef,
        getMenuWidth,
        getCollapsed,
        onBreakpointChange,
        getMode,
        getShowTrigger,
        toggleCollapsed,
      }
    },
  })
</script>
