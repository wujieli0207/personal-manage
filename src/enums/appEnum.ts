export enum SessionTimeoutProcessingEnum {
  PROUTE_JUMP,
  PAGE_COVERAGE,
}

// 数据操作类型
export enum EditType {
  CREATE = "create", // 新增
  UPDATE = "update", // 修改
  DELETE = "delete", // 删除
}

// 路由动画切换方式
export enum RouterTransitionEnum {
  ZOOM_FADE = "zoom-fade",
  ZOOM_OUT = "zoom-out",
  FADE_SLIDE = "fade-slide",
  FADE = "fade",
  FADE_BOTTOM = "fade-bottom",
  FADE_SCALE = "fade-scale",
}

// 登陆方式
export enum LoginTypeEnum {
  LOGIN, // 普通登陆
}
