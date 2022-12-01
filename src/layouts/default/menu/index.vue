<script lang="tsx">
  import { computed, defineComponent, unref } from 'vue'
  import BasicMenu from './components/Menu/BasicMenu.vue'
  import { useGo } from '@/hooks/web/usePage'
  import { useSplitMenu } from './useLayoutMenu'
  import { openWindow } from '@/utils'
  import { isUrl } from '@/utils/is'
  export default defineComponent({
    name: 'LayoutMenu',
    setup() {
      const go = useGo()
      const { menusRef } = useSplitMenu()
      const getCommonProps = computed(() => {
        const menus = unref(menusRef)
        return {
          menus,
          beforeClickFn: beforeMenuClickFn,
          items: menus,
          onMenuClick: handleMenuClick,
        }
      })
      /**
       * click menu
       * @param menu
       */

      function handleMenuClick(path: any) {
        console.log(path, 111)
        go(path.key)
      }

      /**
       * before click menu
       * @param menu
       */
      async function beforeMenuClickFn(path: string) {
        console.log(path)
        if (!isUrl(path)) {
          return true
        }
        openWindow(path)
        return false
      }

      function renderMenu() {
        const { menus, ...menuProps } = unref(getCommonProps)
        console.log(menus)
        if (!menus || !menus.length) return null
        console.log(menus)
        return <BasicMenu {...(menuProps as any)} items={menus} />
      }

      return () => {
        return <>{renderMenu()}</>
      }
    },
  })
</script>
