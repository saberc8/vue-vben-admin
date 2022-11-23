<template>
  <div class="login-container">
    <div class="login-container-slogan">
      <img class="login-container-logo" src="../../../assets/images/logo.png" />
      <div class="login-container-title">
        {{ title }}
      </div>
    </div>
    <LoginForm />
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue'
  import LoginForm from './LoginForm.vue'
  import { useGlobSetting } from '@/hooks/setting'
  defineProps({
    sessionTimeout: {
      type: Boolean,
    },
  })
  const globSetting = useGlobSetting()
  const title = computed(() => globSetting?.title ?? '')
</script>
<style lang="less">
  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: auto;
    background: #f0f2f5;
    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;

    &-slogan {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 40px;

      &-logo {
        width: 100px;
        height: 100px;
        margin-bottom: 16px;
      }

      &-title {
        font-size: 24px;
        color: #1890ff;
      }
    }
  }
</style>
