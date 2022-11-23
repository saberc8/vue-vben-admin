<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
    <Switch
      v-bind="getBindValue"
      @change="handleChange"
      :disabled="disabled"
      checkedChildren="开"
      unCheckedChildren="关"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, computed } from 'vue'

  import { Switch } from 'ant-design-vue'
  import { useDesign } from '@/hooks/web/useDesign'

  import { baseHandler } from '../handler'
  import { HandlerEnum } from '../enum'

  export default defineComponent({
    name: 'SwitchItem',
    components: { Switch },
    props: {
      event: {
        type: Number as PropType<HandlerEnum>,
      },
      disabled: {
        type: Boolean,
      },
      title: {
        type: String,
      },
      def: {
        type: Boolean,
      },
    },
    setup(props) {
      const { prefixCls } = useDesign('setting-switch-item')
      const getBindValue = computed(() => {
        return props.def ? { checked: props.def } : {}
      })
      function handleChange(e: any) {
        props.event && baseHandler(props.event, e)
      }
      return {
        prefixCls,
        handleChange,
        getBindValue,
      }
    },
  })
</script>
<style lang="less" scoped>
  @prefix-cls: 'vben-setting-switch-item';

  .@{prefix-cls} {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
  }
</style>
