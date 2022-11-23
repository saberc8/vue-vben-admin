<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="account" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.account"
        placeholder="账号"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        placeholder="密码"
      />
    </FormItem>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small"> 记住我 </Checkbox>
        </FormItem>
      </ACol>
    </ARow>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        登录
      </Button>
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue'

  import { Checkbox, Form, Input, Row, Col, Button } from 'ant-design-vue'
  import LoginFormTitle from './LoginFormTitle.vue'

  import { useMessage } from '@/hooks/web/useMessage'

  import { useUserStore } from '@/store/modules/user'
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin'
  import { useDesign } from '@/hooks/web/useDesign'
  //import { onKeyStroke } from '@vueuse/core';

  const ACol = Col
  const ARow = Row
  const FormItem = Form.Item
  const InputPassword = Input.Password

  const { notification, createErrorModal } = useMessage()
  const { prefixCls } = useDesign('login')
  const userStore = useUserStore()

  const { getLoginState } = useLoginState()
  const { getFormRules } = useFormRules()

  const formRef = ref()
  const loading = ref(false)
  const rememberMe = ref(false)

  const formData = reactive({
    account: 'vben',
    password: '123456',
  })

  const { validForm } = useFormValid(formRef)

  //onKeyStroke('Enter', handleLogin);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

  async function handleLogin() {
    const data = await validForm()
    if (!data) return
    try {
      loading.value = true
      const userInfo = await userStore.login({
        password: data.password,
        username: data.account,
        mode: 'none', //不要默认的错误提示
      })
      if (userInfo) {
        notification.success({
          message: '登录成功',
          description: `用户名: ${userInfo.realName}`,
          duration: 3,
        })
      }
    } catch (error) {
      createErrorModal({
        title: '错误提示',
        content: (error as unknown as Error).message || '登录失败',
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      })
    } finally {
      loading.value = false
    }
  }
</script>
