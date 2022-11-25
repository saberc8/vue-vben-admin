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
  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      LayoutContent,
      LayoutSideBar,
      LayoutMultipleHeader,
      Layout,
    },
    setup() {},
  })
</script>
