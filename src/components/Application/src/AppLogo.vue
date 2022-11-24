<template>
  <div class="anticon" @click="goHome">
    <img src="../../../assets/images/logo.png" />
    <div v-show="showTitle">
      {{ title }}
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useGlobSetting } from '@/hooks/setting'
  import { useGo } from '@/hooks/web/usePage'
  import { PageEnum } from '@/enums/pageEnum'
  import { useUserStore } from '@/store/modules/user'

  defineProps({
    showTitle: { type: Boolean, default: true },
    alwaysShowTitle: { type: Boolean },
  })

  const userStore = useUserStore()
  const { title } = useGlobSetting()
  const go = useGo()

  function goHome() {
    go(userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
  }
</script>
