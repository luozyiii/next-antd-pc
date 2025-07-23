import { pathToRegexp } from 'path-to-regexp';

interface MatchResult {
  isExact: boolean;
  params: Record<string, string>;
  path: string;
  url: string;
}

interface PathKey {
  name: string;
}

interface _MenuTreeItem {
  label: string;
  key: string;
  children?: _MenuTreeItem[];
  redirect?: string;
}

/**
 *
 * @param {*} path 路径规则
 * @param {*} pathname 具体的地址
 * @param {*} option 相关配置  配置是一个对象，该对象中，可以出现： exact, sensitive,strict
 */

export default function matchPath(path: string, pathname: string, _options?: object): MatchResult | undefined {
  try {
    const { regexp, keys } = pathToRegexp(path);
    const result = regexp.exec(pathname);
    if (!result) {
      return;
    } else {
      // 简化的参数提取，新版本API不同
      const params: Record<string, string> = {};
      // 提取参数
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i] as PathKey;
        const value = result[i + 1];
        if (key && value !== undefined) {
          params[key.name] = value;
        }
      }
      return { isExact: pathname === result[0], params, path, url: result[0] };
    }
  } catch {
    // 如果新版本API不兼容，使用简单的字符串匹配
    const isExact = path === pathname;
    const isMatch = pathname.startsWith(path) || path.includes(':');
    if (isMatch || isExact) {
      return { isExact, params: {}, path, url: pathname };
    }
    return;
  }
}

/**
 * 将传入的react-router的配置，转换为path-to-regexp的配置
 * @param {*} option
 */

function _getOptions(options = {}) {
  const defaultOptions = { exact: false, sensitive: false, strict: false };
  const opts = { ...defaultOptions, ...options };
  return { sensitive: opts.sensitive, strict: opts.sensitive, end: opts.exact };
}

/**
 * 根据匹配的分组结果，得到一个params对象
 * @param {*} groups
 * @param {*} keys
 */

function _getParams(groups: string[], keys: PathKey[]): Record<string, string> {
  const obj: Record<string, string> = {};
  for (let i = 0; i < groups.length; i++) {
    const value = groups[i];
    const key = keys[i];
    if (key && key.name && value !== undefined) {
      obj[key.name] = value;
    }
  }
  return obj;
}

function getTitles(tree: TreeItem[]): Record<string, string> {
  const res: Record<string, string> = {};
  function dfs(tree: TreeItem[], par?: string[]) {
    if (!tree || tree.length === 0) {
      return res;
    }
    for (let i = 0; i < tree.length; i++) {
      const t = tree[i];
      if (t) {
        t.par = par ? [...par, t.key] : [t.key];
        if (t.children && Array.isArray(t.children) && t.children.length > 0) {
          dfs(t.children, t.par);
        }
        if (t.key && t.par) {
          res[`/${t.par.join('/')}`] = (t.label as string) || '';
        }
      }
    }
  }
  dfs(tree);
  return res;
}

const getAllPath = (pathname: string) => {
  const pathSnippets = pathname.split('/').filter((i: string) => i);
  return pathSnippets.map((_: string, index: number) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return url;
  });
};

interface TreeItem {
  isMenu?: boolean;
  key: string;
  label?: string;
  children?: TreeItem[];
  par?: string[];
  [key: string]: unknown;
}

// 递归处理菜单
const treeForeach = (tree: TreeItem[], path?: string[]): TreeItem[] => {
  return tree
    ?.map((data: TreeItem) => {
      const { isMenu, key: _path, children, ...other } = data;
      const pathArr = path ? [...path, _path] : [_path];
      if (isMenu === false) {
        return null;
      }
      return {
        ...other,
        path: _path,
        key: `/${pathArr.join('/')}`,
        children: children ? treeForeach(children, pathArr) : undefined,
      } as TreeItem;
    })
    .filter((item): item is TreeItem => item !== null);
};

export { getAllPath, getTitles, matchPath, treeForeach };
