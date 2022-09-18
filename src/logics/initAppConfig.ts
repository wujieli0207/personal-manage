import { Persistent } from '/@/utils/cache/persistent'
import { ProjectConfig } from '/#/config'
import { useAppStore } from '/@/store/modules/app'
import { deepMerge } from '/@/utils'
import { PROJ_CFG_KEY } from '/@/enums/cacheEnum'
import projectSetting from '/@/settings/projectSetting'
import { useDark } from '/@/hooks/web/useDark'
import { useRootSetting } from '/@/hooks/setting/useRootSetting'

export function initAppConfigStore() {
  const appStore = useAppStore()
  // 项目配置初始化
  let projectConfig: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig
  projectConfig = deepMerge(projectSetting, projectConfig || {})

  appStore.setProjectConfig(projectConfig)

  // 设置暗黑模式
  useDark()

  const { getThemeColor } = useRootSetting()

  // 初始化主题色
  const el = document.documentElement
  getComputedStyle(el).getPropertyValue(`--el-color-primary`)
  el.style.setProperty('--el-color-primary', getThemeColor.value)
}
