import { Button, Form, Input } from "antd";
import { FC, memo } from "react";
import { useHistory } from "react-router";

import { Footer, Header } from "components/modules";
import { useAuth } from "hooks/useAuth";
import { Page, paths } from "routes/constants";
import s from "./LoginPage.module.scss";

const LoginPage: FC = () => {
  const history = useHistory();
  const { login } = useAuth(history);

  const linkToResetPassword = () => history.push(paths[Page.RESET_PASSWORD]);
  const onFinish = (value) => login(value);

  const validateMessages = {
    required: "Поле необходимо заполнить!",
    types: {
      email: "Email введён некорректно!",
    },
  };

  return (
    <>
      <Header />
      <div className={s["login-page"]}>
        <div className={s["login-card"]}>
          <h4 className={s["login-card__title"]}>Авторизация</h4>
          <Form validateMessages={validateMessages} onFinish={onFinish} autoComplete="off">
            <div className={s["login-form"]}>
              <label className={s["login-form__lbl"]} htmlFor="login">
                Email
              </label>
              <Form.Item rules={[{ type: "email", required: true }]} name="login">
                <Input allowClear id="login" />
              </Form.Item>
              <label className={s["login-form__lbl"]} htmlFor="password">
                Пароль
              </label>
              <Form.Item rules={[{ required: true }]} name="password">
                <Input.Password minLength={6} maxLength={20} id="password" />
              </Form.Item>
            </div>
            <div className={s["login-form__btn"]}>
              <Button type="primary" size="large" htmlType="submit">
                Войти
              </Button>
            </div>
          </Form>
          <span className={s["login-card__reset-pass"]} onClick={linkToResetPassword}>
            Забыли пароль?
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default memo(LoginPage);
