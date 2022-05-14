/**
 * @description 将所有环境变量设知道 process.env
 */
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const result = {} as any;

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName =
      realName === "true" ? true : realName === "false" ? false : realName;

    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }

    if (envName === "VITE_PROXY" && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = "";
      }
    }

    result[envName] = realName;

    if (typeof realName === "string") {
      process.env[envName] = realName;
    }
    if (typeof realName === "object") {
      process.env[envName] = JSON.stringify(realName);
    }
  }

  return result;
}
