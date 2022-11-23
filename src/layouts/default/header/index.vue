<template>
  <Header>
    <!-- left start -->
    <div>
      <!-- logo -->
      <LayoutTrigger
        v-if="
          (getShowContent && getShowHeaderTrigger && !getSplit && !getIsMixSidebar) || getIsMobile
        "
        :sider="false"
      />
      21332313
      <LayoutBreadcrumb v-if="getShowContent && getShowBread" />
    </div>
    <!-- left end -->

    <!-- menu start -->
    <div :class="`${prefixCls}-menu`" v-if="getShowTopMenu && !getIsMobile">
      <LayoutMenu :isHorizontal="true" :splitType="getSplitType" :menuMode="getMenuMode" />
    </div>
    <!-- menu-end -->

    <!-- action  -->
    <div :class="`${prefixCls}-action`">
      <FullScreen v-if="getShowFullScreen" :class="`${prefixCls}-action__item fullscreen-item`" />

      <UserDropDown />

      <SettingDrawer v-if="getShowSetting" :class="`${prefixCls}-action__item`" />
    </div>
  </Header>
</template>
<script lang="ts">
  import { defineComponent, unref, computed } from 'vue'

  import { propTypes } from '@/utils/propTypes'

  import { Layout } from 'ant-design-vue'
  import LayoutMenu from '../menu/index.vue'
  import LayoutTrigger from '../trigger/index.vue'

  import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import { useRootSetting } from '@/hooks/setting/useRootSetting'

  import { MenuModeEnum, MenuSplitTyeEnum } from '@/enums/menuEnum'
  import { SettingButtonPositionEnum } from '@/enums/appEnum'

  import { UserDropDown, LayoutBreadcrumb, FullScreen } from './components'
  import { useAppInject } from '@/hooks/web/useAppInject'
  import { useDesign } from '@/hooks/web/useDesign'

  import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'

  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      // eslint-disable-next-line vue/no-reserved-component-names
      Header: Layout.Header,
      LayoutTrigger,
      LayoutBreadcrumb,
      LayoutMenu,
      UserDropDown,
      FullScreen,
      SettingDrawer: createAsyncComponent(() => import('@/layouts/default/setting/index.vue'), {
        loading: true,
      }),
    },
    props: {
      fixed: propTypes.bool,
    },
    setup(props) {
      const { prefixCls } = useDesign('layout-header')
      const {
        getShowTopMenu,
        getShowHeaderTrigger,
        getSplit,
        getIsMixMode,
        getMenuWidth,
        getIsMixSidebar,
      } = useMenuSetting()
      const { getUseErrorHandle, getShowSettingButton, getSettingButtonPosition } = useRootSetting()

      const { getShowFullScreen, getShowContent, getShowBread, getShowHeaderLogo, getShowHeader } =
        useHeaderSetting()

      const { getIsMobile } = useAppInject()

      const getHeaderClass = computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}--fixed`]: props.fixed,
            [`${prefixCls}--mobile`]: unref(getIsMobile),
          },
        ]
      })

      const getShowSetting = computed(() => {
        if (!unref(getShowSettingButton)) {
          return false
        }
        const settingButtonPosition = unref(getSettingButtonPosition)

        if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
          return unref(getShowHeader)
        }
        return settingButtonPosition === SettingButtonPositionEnum.HEADER
      })

      const getLogoWidth = computed(() => {
        if (!unref(getIsMixMode) || unref(getIsMobile)) {
          return {}
        }
        const width = unref(getMenuWidth) < 180 ? 180 : unref(getMenuWidth)
        return { width: `${width}px` }
      })

      const getSplitType = computed(() => {
        return unref(getSplit) ? MenuSplitTyeEnum.TOP : MenuSplitTyeEnum.NONE
      })

      const getMenuMode = computed(() => {
        return unref(getSplit) ? MenuModeEnum.HORIZONTAL : null
      })

      return {
        prefixCls,
        getHeaderClass,
        getShowHeaderLogo,
        getShowHeaderTrigger,
        getIsMobile,
        getShowBread,
        getShowContent,
        getSplitType,
        getSplit,
        getMenuMode,
        getShowTopMenu,
        getShowFullScreen,
        getUseErrorHandle,
        getLogoWidth,
        getIsMixSidebar,
        getShowSettingButton,
        getShowSetting,
      }
    },
  })
</script>
<style lang="less"></style>
