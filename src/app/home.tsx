import { CustomLayout } from "@/components";
import styles from "./page.module.scss";

const Home = () => {
  return (
    <CustomLayout>
      <div className={styles.home}>
        👏👏👏 很高兴看见你～
        <br />
        <br />
        这是一个 NextJS v13 的试验性项目。
      </div>
    </CustomLayout>
  );
};

export default Home;
