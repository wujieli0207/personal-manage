import { ThemeEnum } from '/@/enums/appEnum'

export const darkMode = ThemeEnum.LIGHT

// 全局命名空间前缀
export const prefixCls = 'wujie'

export interface AppPresentColor {
  color: string
  textColor: string
  tip: string
}

// 系统主题颜色配置
export const APP_PRESET_COLOR_LIST: AppPresentColor[] = [
  {
    color: '#409eff',
    textColor: '#fff',
    tip: '默认蓝',
  },
  {
    color: '#d60f20',
    textColor: '#fff',
    tip: '玫瑰红',
  },
  {
    color: '#ac25e6',
    textColor: '#fff',
    tip: '优雅紫',
  },
  {
    color: '#4dc86f',
    textColor: '#fff',
    tip: '故事绿',
  },
  {
    color: '#13c2c2',
    textColor: '#fff',
    tip: '明青',
  },
  {
    color: '#333',
    textColor: '#fff',
    tip: '极客黑',
  },
]
