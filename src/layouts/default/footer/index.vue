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
  import { computed, defineComponent, unref, ref } from 'vue'
  import { Layout } from 'ant-design-vue'

  import { GithubFilled } from '@ant-design/icons-vue'

  import { DOC_URL, GITHUB_URL, SITE_URL } from '@/settings/siteSetting'
  import { openWindow } from '@/utils'
  import { useRootSetting } from '@/hooks/setting/useRootSetting'
  import { useRouter } from 'vue-router'

  import { useLayoutHeight } from '../content/useContentViewHeight'

  export default defineComponent({
    name: 'LayoutFooter',
    components: { AFooter: Layout.Footer, GithubFilled },
    setup() {
      const { getShowFooter } = useRootSetting()
      const { currentRoute } = useRouter()
      const footerRef = ref<ComponentRef>(null)
      const { setFooterHeight } = useLayoutHeight()

      const getShowLayoutFooter = computed(() => {
        if (unref(getShowFooter)) {
          const footerEl = unref(footerRef)?.$el
          setFooterHeight(footerEl?.offsetHeight || 0)
        } else {
          setFooterHeight(0)
        }
        return unref(getShowFooter) && !unref(currentRoute).meta?.hiddenFooter
      })

      return {
        getShowLayoutFooter,
        DOC_URL,
        GITHUB_URL,
        SITE_URL,
        openWindow,
        footerRef,
      }
    },
  })
</script>
