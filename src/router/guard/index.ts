import { Router } from "vue-router";
import { createPageGuard } from "./pageGuard";
import { createPermissionGuard } from "./permissionGuard";
import { createStateGuard } from "./stateGuard";

export function setupRouterGuard(router: Router) {
  createPermissionGuard(router);
  createPageGuard(router);
  createStateGuard(router);
}
