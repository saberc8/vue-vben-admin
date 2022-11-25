<template>
  <a-footer ref="footerRef">
    <div>
      <a @click="openWindow(SITE_URL)">在线预览</a>
      <GithubFilled @click="openWindow(GITHUB_URL)" />

      <a @click="openWindow(DOC_URL)">在线文档</a>
    </div>
    <div>Copyright &copy;2020 Vben Admin</div>
  </a-footer>
</template>

<script lang="ts">
  import { Layout } from 'ant-design-vue'
  import { GithubFilled } from '@ant-design/icons-vue'
  import { DOC_URL, GITHUB_URL, SITE_URL } from '@/settings/siteSetting'
  import { openWindow } from '@/utils'
  export default defineComponent({
    name: 'LayoutFooter',
    components: { AFooter: Layout.Footer, GithubFilled },
    setup() {
      const footerRef = ref<ComponentRef>(null)
      return {
        DOC_URL,
        GITHUB_URL,
        SITE_URL,
        openWindow,
        footerRef,
      }
    },
  })
</script>
