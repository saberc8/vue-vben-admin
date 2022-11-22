<template>
  login
  <a-space>
  <a-button @click="go">1</a-button>
  <a-button>2</a-button>
  <a-button>3</a-button>
  </a-space>
  <StarOutlined />
  <StarFilled />
  <StarTwoTone />
</template>

<script lang="ts" setup>
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons-vue'
const router = useRouter()
const go = () => {
  router.push('/workbench')
}
</script>