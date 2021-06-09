import { Button, Form, Input } from "antd";
import { useAuth } from "hooks/useAuth";
import { memo } from "react";
import styles from "./LoginPage.module.scss";

function LoginPage(type: string, id: string) {
  const { login } = useAuth();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={styles["login-page"]}>
      <div className={styles["login-page__card"]}>
        <h1 className={styles["login-page__title"]}>Авторизация</h1>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={login}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="login"
            rules={[{ required: true, message: "Введите ваш логин" }]}
          >
            <Input placeholder="Логин" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Введите ваш пароль" }]}
          >
            <Input.Password minLength={6} maxLength={20} placeholder="Пароль" />
          </Form.Item>

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
  );
}

export default memo(LoginPage);
