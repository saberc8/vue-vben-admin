import { defineComponent, unref } from 'vue'
import { BasicDrawer } from '@/components/Drawer/index'
import { Divider } from 'ant-design-vue'
import { TypePicker, SettingFooter, SwitchItem, SelectItem } from './components'

import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
import { baseHandler } from './handler'
import { HandlerEnum, routerTransitionOptions, menuTypeList } from './enum'

export default defineComponent({
  name: 'SettingDrawer',
  setup(_, { attrs }) {
    const { getShowFooter, getColorWeak, getGrayMode } = useRootSetting()

    const { getOpenPageLoading, getBasicTransition, getEnableTransition, getOpenNProgress } =
      useTransitionSetting()

    const { getMenuType } = useMenuSetting()

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
        <Divider>{() => '导航栏模式'}</Divider>
        {renderSidebar()}
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
