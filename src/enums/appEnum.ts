export enum SessionTimeoutProcessingEnum {
  PROUTE_JUMP,
  PAGE_COVERAGE,
}

// 数据操作类型
export enum EditType {
  CREATE = 'create', // 新增
  UPDATE = 'update', // 修改
  DELETE = 'delete', // 删除
}

// 路由动画切换方式
export enum RouterTransitionEnum {
  ZOOM_FADE = 'zoom-fade',
  ZOOM_OUT = 'zoom-out',
  FADE_SLIDE = 'fade-slide',
  FADE = 'fade',
  FADE_BOTTOM = 'fade-bottom',
  FADE_SCALE = 'fade-scale',
}

// 登陆方式
export enum LoginTypeEnum {
  LOGIN, // 普通登陆
}

// 权限模式
export enum PermissionModeEnum {
  ROLE = 'ROLE',
  BACK = 'BACK',
  ROUTE_MAPPING = 'ROUTE_MAPPING',
}

// 系统暗色、亮色主题
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

// 系统设置枚举
export enum HandlerEnum {
  CHANGE_THEME = 'CHANGE_THEME', // 更改系统主题：亮色 / 暗色
  CHANGE_THEME_COLOR = 'CHANGE_THEME_COLOR', // 更新系统主题颜色
}
