import { Button, Form, Input } from "antd";
import { useAuth } from "hooks/useAuth";
import { memo } from "react";
import { useHistory } from "react-router";
import styles from "./LoginPage.module.scss";
import { Link } from "react-router-dom";
import { Page, paths } from "routes/constants";
import Header from "components/modules/Header";
import Footer from "components/modules/Footer";
import classNames from "classnames";

function LoginPage() {
  const history = useHistory();
  const { login } = useAuth(history);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className={styles["login-page"]}>
          <div className={styles["login-page__card"]}>
            <h1 className={styles["login-page__title"]}>Авторизация</h1>
            <Form
              name="basic"
              className={styles["login-page__form"]}
              initialValues={{ remember: true }}
              onFinish={login}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="login"
                rules={[{ required: true, message: "Введите ваш логин" }]}
              >
                <Input
                  className={styles["login-page__input"]}
                  placeholder="Логин"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Введите ваш пароль" }]}
              >
                <Input.Password
                  className={classNames(
                    styles["login-page__input"],
                    styles["password-wrap"]
                  )}
                  minLength={6}
                  maxLength={20}
                  placeholder="Пароль"
                />
              </Form.Item>

              <div className={styles["forgot-pass"]}>
                <span>Забыли пароль?</span>
                <Link to={paths[Page.RESET_PASSWORD]}>Восстановите его</Link>
              </div>

              <Form.Item>
                <div className={styles["login-btn-wrap"]}>
                  <Button type="primary" htmlType="submit">
                    Войти
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default memo(LoginPage);
