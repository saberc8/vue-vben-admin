<script lang="ts">
  import { BackTop } from 'ant-design-vue'
  import { useDesign } from '@/hooks/web/useDesign'
  import { useUserStoreWithOut } from '@/store/modules/user'

  import SessionTimeoutLogin from '@/views/sys/login/SessionTimeoutLogin.vue'
  export default defineComponent({
    name: 'LayoutFeatures',
    components: {
      BackTop,
      SessionTimeoutLogin,
    },
    setup() {
      const userStore = useUserStoreWithOut()
      const { prefixCls } = useDesign('setting-drawer-feature')
      const getIsSessionTimeout = computed(() => userStore.getSessionTimeout)

      return {
        getTarget: () => document.body,
        prefixCls,
        getIsSessionTimeout,
      }
    },
  })
</script>

<template>
  <BackTop :target="getTarget" />
  <SessionTimeoutLogin v-if="getIsSessionTimeout" />
</template>
