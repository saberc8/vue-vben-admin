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
      const { getShowSidebar } = useMenuSetting()

      const layoutClass = computed(() => {
        let cls: string[] = ['ant-layout']
        return cls
      })

      return {
        getShowSidebar,
        prefixCls,
        getIsMobile,
        layoutClass,
      }
    },
  })
</script>
