<script lang="ts">
  import { BackTop } from 'ant-design-vue'
  import { useDesign } from '@/hooks/web/useDesign'
  import { useUserStoreWithOut } from '@/store/modules/user'

  import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'

  import SessionTimeoutLogin from '@/views/sys/login/SessionTimeoutLogin.vue'
  export default defineComponent({
    name: 'LayoutFeatures',
    components: {
      BackTop,
      SettingDrawer: createAsyncComponent(() => import('@/layouts/default/setting/index.vue')),
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
  <SettingDrawer :class="prefixCls" />
  <SessionTimeoutLogin v-if="getIsSessionTimeout" />
</template>
