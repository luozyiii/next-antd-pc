import { Metadata } from 'next';
import Home from './home';

export const metadata: Metadata = {
  title: 'next-antd-pc 👏',
};

const HomePage = () => {
  return <Home />;
};

export default HomePage;
