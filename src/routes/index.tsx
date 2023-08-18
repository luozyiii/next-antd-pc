import { HomeOutlined, WifiOutlined, SmileOutlined } from '@ant-design/icons';
import demo from './demo';
import { getTitles, matchPath, treeForeach } from './utils';

const config: any['items'] = [
  {
    label: '首页',
    key: '',
    icon: <HomeOutlined />,
  },
  demo,
  {
    label: '关于我',
    key: 'about',
    icon: <SmileOutlined />,
  },
  {
    label: '你点不了',
    key: 'hi',
    icon: <WifiOutlined />,
    disabled: true,
  },
  {
    label: '点了会迷路',
    key: 'notfound',
  },
];

// 顶部菜单
const topMenuConfig = config?.map((item: any) => {
  const { children, ...other } = item;
  return other;
});

// 获取侧边栏菜单
const getSideMenu = (key: string) => {
  const newConfig = config?.find((item: any) => item.key === key)?.children || [];
  return treeForeach(newConfig, [key]);
};

// 获取路由配置标题
const getRouteTitle = (pathname: string) => {
  const titles = getTitles(config);
  let title = '';
  for (const key in titles) {
    if (matchPath(key, pathname)) {
      title = titles[key];
      break;
    }
  }
  return title;
};

export { topMenuConfig, getSideMenu, getRouteTitle };
