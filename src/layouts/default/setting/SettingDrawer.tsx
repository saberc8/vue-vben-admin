import { defineComponent, unref } from 'vue'
import { BasicDrawer } from '@/components/Drawer/index'
import { Divider } from 'ant-design-vue'
import { TypePicker, ThemeColorPicker, SettingFooter, SwitchItem, SelectItem } from './components'
import { AppDarkModeToggle } from '@/components/Application'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
import { baseHandler } from './handler'
import { HandlerEnum, routerTransitionOptions, menuTypeList } from './enum'
import {
  HEADER_PRESET_BG_COLOR_LIST,
  SIDE_BAR_BG_COLOR_LIST,
  APP_PRESET_COLOR_LIST,
} from '@/settings/designSetting'

export default defineComponent({
  name: 'SettingDrawer',
  setup(_, { attrs }) {
    const { getShowFooter, getColorWeak, getGrayMode, getShowDarkModeToggle, getThemeColor } =
      useRootSetting()

    const { getOpenPageLoading, getBasicTransition, getEnableTransition, getOpenNProgress } =
      useTransitionSetting()

    const { getMenuType, getMenuBgColor } = useMenuSetting()

    const { getHeaderBgColor } = useHeaderSetting()

    function renderSidebar() {
      return (
        <>
          <TypePicker
            menuTypeList={menuTypeList}
            handler={(item: typeof menuTypeList[0]) => {
              baseHandler(HandlerEnum.CHANGE_LAYOUT, {
                mode: item.mode,
                type: item.type,
              })
            }}
            def={unref(getMenuType)}
          />
        </>
      )
    }

    function renderHeaderTheme() {
      return (
        <ThemeColorPicker
          colorList={HEADER_PRESET_BG_COLOR_LIST}
          def={unref(getHeaderBgColor)}
          event={HandlerEnum.HEADER_THEME}
        />
      )
    }

    function renderSiderTheme() {
      return (
        <ThemeColorPicker
          colorList={SIDE_BAR_BG_COLOR_LIST}
          def={unref(getMenuBgColor)}
          event={HandlerEnum.MENU_THEME}
        />
      )
    }

    function renderMainTheme() {
      return (
        <ThemeColorPicker
          colorList={APP_PRESET_COLOR_LIST}
          def={unref(getThemeColor)}
          event={HandlerEnum.CHANGE_THEME_COLOR}
        />
      )
    }

    function renderContent() {
      return (
        <>
          <SwitchItem title={'页脚'} event={HandlerEnum.SHOW_FOOTER} def={unref(getShowFooter)} />
          <SwitchItem title={'灰色模式'} event={HandlerEnum.GRAY_MODE} def={unref(getGrayMode)} />
          <SwitchItem title={'色弱模式'} event={HandlerEnum.COLOR_WEAK} def={unref(getColorWeak)} />
        </>
      )
    }

    function renderTransition() {
      return (
        <>
          <SwitchItem
            title="顶部进度条"
            event={HandlerEnum.OPEN_PROGRESS}
            def={unref(getOpenNProgress)}
          />
          <SwitchItem
            title="页面loading"
            event={HandlerEnum.OPEN_PAGE_LOADING}
            def={unref(getOpenPageLoading)}
          />
          <SwitchItem
            title="页面切换动画"
            event={HandlerEnum.OPEN_ROUTE_TRANSITION}
            def={unref(getEnableTransition)}
          />
          <SelectItem
            title="动画类型"
            event={HandlerEnum.ROUTER_TRANSITION}
            def={unref(getBasicTransition)}
            options={routerTransitionOptions}
            disabled={!unref(getEnableTransition)}
          />
        </>
      )
    }

    return () => (
      <BasicDrawer {...attrs} title="项目配置" width={330} class="setting-drawer">
        {unref(getShowDarkModeToggle) && <Divider>{() => '主题'}</Divider>}
        {unref(getShowDarkModeToggle) && <AppDarkModeToggle class="mx-auto" />}
        <Divider>{() => '导航栏模式'}</Divider>
        {renderSidebar()}
        <Divider>{() => '系统主题'}</Divider>
        {renderMainTheme()}
        <Divider>{() => '顶栏主题'}</Divider>
        {renderHeaderTheme()}
        <Divider>{() => '菜单主题'}</Divider>
        {renderSiderTheme()}
        <Divider>{() => '界面显示'}</Divider>
        {renderContent()}
        <Divider>{() => '动画'}</Divider>
        {renderTransition()}
        <Divider />
        <SettingFooter />
      </BasicDrawer>
    )
  },
})
