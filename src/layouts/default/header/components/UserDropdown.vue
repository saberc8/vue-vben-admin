<template>
  <Dropdown placement="bottomLeft" overlayClassName="userdrop">
    <span>
      <img :src="getUserInfo.avatar" />
      <span>
        <span>
          {{ getUserInfo.realName }}
        </span>
      </span>
    </span>

    <template #overlay>
      <Menu @click="handleMenuClick">
        <MenuItem key="doc" text="文档" icon="ion:document-text-outline" />
        <MenuDivider />
        <MenuItem key="logout" text="退出系统" icon="ion:power-outline" />
      </Menu>
    </template>
  </Dropdown>
</template>
<script lang="ts">
  import { Dropdown, Menu } from 'ant-design-vue'
  import type { MenuInfo } from 'ant-design-vue/lib/menu/src/interface'

  import { DOC_URL } from '@/settings/siteSetting'

  import { useUserStore } from '@/store/modules/user'

  import headerImg from '@/assets/images/header.jpg'
  import { openWindow } from '@/utils'

  type MenuEvent = 'logout' | 'doc'
  import MenuItem from './DropMenuItem.vue'
  export default defineComponent({
    name: 'UserDropdown',
    components: {
      Dropdown,
      // eslint-disable-next-line vue/no-reserved-component-names
      Menu,
      MenuItem,
      MenuDivider: Menu.Divider,
    },
    setup() {
      const userStore = useUserStore()

      const getUserInfo = computed(() => {
        const { realName = '', avatar, desc } = userStore.getUserInfo || {}
        return { realName, avatar: avatar || headerImg, desc }
      })

      //  login out
      function handleLoginOut() {
        userStore.confirmLoginOut()
      }

      // open doc
      function openDoc() {
        openWindow(DOC_URL)
      }

      function handleMenuClick(e: MenuInfo) {
        switch (e.key as MenuEvent) {
          case 'logout':
            handleLoginOut()
            break
          case 'doc':
            openDoc()
            break
        }
      }

      return {
        getUserInfo,
        handleMenuClick,
      }
    },
  })
</script>

<style>
  .userdrop {
    height: 48px;
    background-color: blue;
  }
</style>
