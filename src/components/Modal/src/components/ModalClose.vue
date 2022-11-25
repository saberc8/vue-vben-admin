<template>
  <div>
    <template v-if="canFullscreen">
      <Tooltip title="还原" placement="bottom" v-if="fullScreen">
        <FullscreenExitOutlined role="full" @click="handleFullScreen" />
      </Tooltip>
      <Tooltip title="最大化" placement="bottom" v-else>
        <FullscreenOutlined role="close" @click="handleFullScreen" />
      </Tooltip>
    </template>
    <Tooltip title="关闭" placement="bottom">
      <CloseOutlined @click="handleCancel" />
    </Tooltip>
  </div>
</template>
<script lang="ts">
  import { FullscreenExitOutlined, FullscreenOutlined, CloseOutlined } from '@ant-design/icons-vue'

  import { Tooltip } from 'ant-design-vue'

  export default defineComponent({
    name: 'ModalClose',
    components: { Tooltip, FullscreenExitOutlined, FullscreenOutlined, CloseOutlined },
    props: {
      canFullscreen: { type: Boolean, default: true },
      fullScreen: { type: Boolean },
    },
    emits: ['cancel', 'fullscreen'],
    setup(_, { emit }) {
      function handleCancel(e: Event) {
        emit('cancel', e)
      }

      function handleFullScreen(e: Event) {
        e?.stopPropagation()
        e?.preventDefault()
        emit('fullscreen')
      }

      return {
        handleCancel,
        handleFullScreen,
      }
    },
  })
</script>
<style lang="less">
  @prefix-cls: 'vben-basic-modal-close';
  .@{prefix-cls} {
    display: flex;
    height: 95%;
    align-items: center;

    > span {
      margin-left: 48px;
      font-size: 16px;
    }

    &--can-full {
      > span {
        margin-left: 12px;
      }
    }

    &:not(&--can-full) {
      > span:nth-child(1) {
        &:hover {
          font-weight: 700;
        }
      }
    }

    & span:nth-child(1) {
      display: inline-block;
      padding: 10px;

      &:hover {
        color: #0960bd;
      }
    }

    & span:last-child {
      &:hover {
        color: #f00;
      }
    }
  }
</style>
