<template>
  <Layout>
    <Layout>
      <LayoutSideBar />
      <Layout>
        <LayoutMultipleHeader />
        <LayoutContent />
      </Layout>
    </Layout>
  </Layout>
</template>

<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'
  import { Layout } from 'ant-design-vue'
  import LayoutContent from './content/index.vue'
  import LayoutSideBar from './sider/index.vue'
  import LayoutMultipleHeader from './header/MultipleHeader.vue'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import { useDesign } from '@/hooks/web/useDesign'

  import { useAppInject } from '@/hooks/web/useAppInject'

  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      LayoutContent,
      LayoutSideBar,
      LayoutMultipleHeader,
      Layout,
    },
    setup() {
      const { prefixCls } = useDesign('default-layout')
      const { getIsMobile } = useAppInject()
      const { getShowSidebar, getIsMixSidebar, getShowMenu } = useMenuSetting()

      const layoutClass = computed(() => {
        let cls: string[] = ['ant-layout']
        if (unref(getIsMixSidebar) || unref(getShowMenu)) {
          cls.push('ant-layout-has-sider')
        }
        return cls
      })

      return {
        getShowSidebar,
        prefixCls,
        getIsMobile,
        getIsMixSidebar,
        layoutClass,
      }
    },
  })
</script>
<style lang="less">
  @prefix-cls: 'vben-default-layout';

  .@{prefix-cls} {
    display: flex;
    width: 100%;
    min-height: 100%;
    background-color: #f4f7f9;
    flex-direction: column;

    > .ant-layout {
      min-height: 100%;
    }

    &-main {
      width: 100%;
      margin-left: 1px;
    }
  }
</style>
