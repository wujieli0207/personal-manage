import { withInstall } from "/@/utils";
import appDarkModeToggle from "./src/AppDarkModeToggle.vue";
import appProvider from "./src/AppProvider.vue";

export const AppDarkModeToggle = withInstall(appDarkModeToggle);
export const AppProvider = withInstall(appProvider);
