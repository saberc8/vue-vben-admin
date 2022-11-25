<template>
  <span @click="handleRedo">
    <RedoOutlined :spin="loading" />
  </span>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { RedoOutlined } from '@ant-design/icons-vue'

  import { useTabs } from '@/hooks/web/useTabs'

  export default defineComponent({
    name: 'TabRedo',
    components: { RedoOutlined },

    setup() {
      const loading = ref(false)
      const { refreshPage } = useTabs()

      async function handleRedo() {
        loading.value = true
        await refreshPage()
        setTimeout(() => {
          loading.value = false
          // Animation execution time
        }, 1200)
      }
      return { handleRedo, loading }
    },
  })
</script>
