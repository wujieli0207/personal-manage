import { isFunction } from "/@/utils/is";
const validEvents = [
  "onActivate",
  "onAddUndo",
  "onBeforeAddUndo",
  "onBeforeExecCommand",
  "onBeforeGetContent",
  "onBeforeRenderUI",
  "onBeforeSetContent",
  "onBeforePaste",
  "onBlur",
  "onChange",
  "onClearUndos",
  "onClick",
  "onContextMenu",
  "onCopy",
  "onCut",
  "onDblclick",
  "onDeactivate",
  "onDirty",
  "onDrag",
  "onDragDrop",
  "onDragEnd",
  "onDragGesture",
  "onDragOver",
  "onDrop",
  "onExecCommand",
  "onFocus",
  "onFocusIn",
  "onFocusOut",
  "onGetContent",
  "onHide",
  "onInit",
  "onKeyDown",
  "onKeyPress",
  "onKeyUp",
  "onLoadContent",
  "onMouseDown",
  "onMouseEnter",
  "onMouseLeave",
  "onMouseMove",
  "onMouseOut",
  "onMouseOver",
  "onMouseUp",
  "onNodeChange",
  "onObjectResizeStart",
  "onObjectResized",
  "onObjectSelected",
  "onPaste",
  "onPostProcess",
  "onPostRender",
  "onPreProcess",
  "onProgressState",
  "onRedo",
  "onRemove",
  "onReset",
  "onSaveContent",
  "onSelectionChange",
  "onSetAttrib",
  "onSetContent",
  "onShow",
  "onSubmit",
  "onUndo",
  "onVisualAid",
];

const isValidKey = (key: string) => validEvents.includes(key);

/**
 *
 * @description 富文本编辑器绑定操作事件
 */
export function bindHandlers(initEvent: Event, listeners: any, editor: any) {
  Object.keys(listeners)
    .filter(isValidKey)
    .forEach((key: string) => {
      const handler = listeners[key];
      if (isFunction(handler)) {
        if (key === "onInit") {
          handler(initEvent, editor);
        } else {
          editor.on(key.substring(2), (e: any) => handler(e, editor));
        }
      }
    });
}
