<script lang="ts">
  import { BackTop } from 'ant-design-vue'

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
      const getIsSessionTimeout = computed(() => userStore.getSessionTimeout)

      return {
        getTarget: () => document.body,
        getIsSessionTimeout,
      }
    },
  })
</script>

<template>
  <BackTop :target="getTarget" />
  <SessionTimeoutLogin v-if="getIsSessionTimeout" />
</template>
