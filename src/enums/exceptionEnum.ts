export enum ErrorTypeEnum {
  VUE = "vue",
  SCRIPT = "script",
  RESOURCE = "resource",
  AJAX = "ajax",
  PROMISE = "promise",
}

export enum ExceptionEnum {
  PAGE_NOT_ACCESS = 403,
  PAGE_NOT_FOUND = 404,
  ERROR = 500, // 服务端错误
  NET_WORK_ERROR = 10000,
  PAGE_NOTE_DATA = 10100,
}
