<script lang="tsx">
  import type { PropType } from 'vue'

  import { computed, defineComponent, unref, toRef } from 'vue'
  import { BasicMenu } from '@/components/Menu'
  import { MenuModeEnum, MenuSplitTyeEnum } from '@/enums/menuEnum'

  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import { useGo } from '@/hooks/web/usePage'
  import { useSplitMenu } from './useLayoutMenu'
  import { openWindow } from '@/utils'
  import { propTypes } from '@/utils/propTypes'
  import { isUrl } from '@/utils/is'
  import { useRootSetting } from '@/hooks/setting/useRootSetting'
  import { useAppInject } from '@/hooks/web/useAppInject'

  export default defineComponent({
    name: 'LayoutMenu',
    props: {
      splitType: {
        type: Number as PropType<MenuSplitTyeEnum>,
        default: MenuSplitTyeEnum.NONE,
      },

      isHorizontal: propTypes.bool,
      // menu Mode
      menuMode: {
        type: [String] as PropType<Nullable<MenuModeEnum>>,
        default: '',
      },
    },
    setup(props) {
      const go = useGo()

      const {
        getMenuMode,
        getMenuType,
        getCollapsed,
        getCollapsedShowTitle,
        getAccordion,
        getIsSidebarType,
      } = useMenuSetting()
      const { getShowLogo } = useRootSetting()

      const { menusRef } = useSplitMenu(toRef(props, 'splitType'))

      const { getIsMobile } = useAppInject()

      const getComputedMenuMode = computed(() =>
        unref(getIsMobile) ? MenuModeEnum.INLINE : props.menuMode || unref(getMenuMode),
      )
      const getIsShowLogo = computed(() => unref(getShowLogo) && unref(getIsSidebarType))

      const getCommonProps = computed(() => {
        const menus = unref(menusRef)
        return {
          menus,
          beforeClickFn: beforeMenuClickFn,
          items: menus,
          accordion: unref(getAccordion),
          collapse: unref(getCollapsed),
          collapsedShowTitle: unref(getCollapsedShowTitle),
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
        return (
          <BasicMenu
            {...(menuProps as any)}
            isHorizontal={props.isHorizontal}
            type={unref(getMenuType)}
            showLogo={unref(getIsShowLogo)}
            mode={unref(getComputedMenuMode as any)}
            items={menus}
          />
        )
      }

      return () => {
        return <>{renderMenu()}</>
      }
    },
  })
</script>
