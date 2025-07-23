import { HomeOutlined, SmileOutlined, WifiOutlined } from '@ant-design/icons';
import demo from './demo';
import { getTitles, matchPath, treeForeach } from './utils';
import type { MenuConfig, TreeItem } from '@/types';

const config: MenuConfig[] = [
  { label: '首页', key: '', icon: <HomeOutlined /> },
  demo,
  { label: '关于我', key: 'about', icon: <SmileOutlined /> },
  { label: '你点不了', key: 'hi', icon: <WifiOutlined />, disabled: true },
  { label: '点了会迷路', key: 'notfound' },
];

// 顶部菜单
const topMenuConfig = config?.map((item: MenuConfig) => {
  const { children: _children, ...other } = item;
  return other;
});

// 获取侧边栏菜单
const getSideMenu = (key: string): TreeItem[] => {
  const newConfig = config?.find((item: MenuConfig) => item.key === key)?.children || [];
  return treeForeach(newConfig as TreeItem[], [key]);
};

// 获取路由配置标题
const getRouteTitle = (pathname: string): string => {
  const titles = getTitles(config as TreeItem[]);
  let title = '';
  for (const key in titles) {
    if (matchPath(key, pathname)) {
      title = titles[key] || '';
      break;
    }
  }
  return title;
};

export { getRouteTitle, getSideMenu, topMenuConfig };
