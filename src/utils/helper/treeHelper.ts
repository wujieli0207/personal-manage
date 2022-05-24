interface TreeHelperConfig {
  id: string;
  children: string;
  pid: string;
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: "id",
  children: "children",
  pid: "pid",
};

const getConfig = (config: Partial<TreeHelperConfig>) => {
  return Object.assign({}, DEFAULT_CONFIG, config);
};

/**
 *
 * @description 使用 func 对 tree 进行递归过滤
 */
export function filter<T>(
  tree: T[],
  func: (n: T) => boolean,
  config: Partial<TreeHelperConfig> = {}
): T[] {
  config = getConfig(config);
  const children = config.children as string;

  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children]);
        return func(node) || (node[children] && node[children].length);
      });
  }

  return listFilter(tree);
}

/**
 *
 * @description 提取树的指定结构
 */
export function treeMap<T = any>(treeData: T[], opt: { children?: string; conversion: Fn }): T[] {
  return treeData.map((item) => treeMapEach(item, opt));
}

/**
 *
 * @description 提取树的指定结构
 */
export function treeMapEach(
  data: any,
  { children = "children", conversion }: { children?: string; conversion: Fn }
) {
  const haveChildren = Array.isArray(data[children]) && data[children].length > 0;
  const conversionData = conversion(data) || {};

  if (!haveChildren) {
    return {
      ...conversionData,
    };
  } else {
    return {
      ...conversionData,
      [children]: data[children].map((i: number) => {
        return treeMapEach(i, {
          children,
          conversion,
        });
      }),
    };
  }
}
