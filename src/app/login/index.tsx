import { Button } from "antd";
import Link from "next/link";
import { ThemeContent } from "@/components";
import styles from "./styles.module.scss";

const Login = () => {
  return (
    <ThemeContent>
      <div className={styles.login}>
        <Button type="primary" className={styles.loginBtn}>
          <Link href="/">登 录</Link>
        </Button>
      </div>
    </ThemeContent>
  );
};

export default Login;
