<template>
  <SiderTrigger />
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import SiderTrigger from './SiderTrigger.vue'
  export default defineComponent({
    name: 'LayoutTrigger',
    components: {
      SiderTrigger,
    },
    props: {
      sider: {
        type: Boolean,
        default: true,
      },
    },
  })
</script>
