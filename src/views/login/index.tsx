import { Button } from "antd";
import Link from "next/link";
import styles from "./styles.module.scss";

const Login = () => {
  return (
    <>
      <div className={styles.login}>
        <Button type="primary" className={styles.loginBtn}>
          <Link href="/">登录</Link>
        </Button>
      </div>
    </>
  );
};

export default Login;
