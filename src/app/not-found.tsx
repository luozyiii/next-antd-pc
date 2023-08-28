import N404 from './404';

export const metadata = {
  title: '迷路了～',
  description: '迷路的小羔羊',
};

// 在这个页面使用 antd 组件会出现闪烁
export default function NotFound() {
  return <N404 />;
}
