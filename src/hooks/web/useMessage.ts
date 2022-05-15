import { ElNotification, ElMessage, ElMessageBox } from "element-plus";

interface alertOptions {
  message: string;
  title?: string;
}

/**
 *
 * @description success消息提示
 */
function createSuccessAlert(options: alertOptions) {
  const { message, title = "成功提示" } = options;
  return ElMessageBox.alert(message, title, {
    type: "success",
    confirmButtonText: "确定",
  });
}

/**
 *
 * @description info消息提示
 */
function createInfoAlert(options: alertOptions) {
  const { message, title = "信息提示" } = options;
  return ElMessageBox.alert(message, title, {
    type: "info",
    confirmButtonText: "确定",
  });
}

/**
 *
 * @description warn消息提示
 */
function createWarnAlert(options: alertOptions) {
  const { message, title = "警告提示" } = options;
  return ElMessageBox.alert(message, title, {
    type: "warning",
    confirmButtonText: "确定",
  });
}

/**
 *
 * @description error消息提示
 */
function createErrorAlert(options: alertOptions) {
  const { message, title = "错误提示" } = options;
  return ElMessageBox.alert(message, title, {
    type: "error",
    confirmButtonText: "确定",
  });
}

export function useMessage() {
  return {
    notification: ElNotification,
    createMessage: ElMessage,
    createSuccessAlert,
    createInfoAlert,
    createWarnAlert,
    createErrorAlert,
  };
}
