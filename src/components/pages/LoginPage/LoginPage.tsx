import { Button, Form, Input } from "antd";
import { FC } from "react";
import { useHistory } from "react-router";

import { Footer, Header } from "components/modules";
import { useAuth } from "hooks/useAuth";
import { Page, paths } from "routes/constants";
import { fields, validateMessages } from "./consts";
import s from "./LoginPage.module.scss";

const LoginPage: FC = () => {
  const history = useHistory();
  const { login } = useAuth(history);

  const linkToResetPassword = () => history.push(paths[Page.RESET_PASSWORD]);
  const onFinish = (value) => login(value);

  return (
    <>
      <Header />
      <div className={s["login-page"]}>
        <div className={s["login-card"]}>
          <h4 className={s["login-card__title"]}>Авторизация</h4>
          <Form validateMessages={validateMessages} onFinish={onFinish} autoComplete="off">
            <div className={s["login-form__body"]}>
              {fields.map(({ key, name, label, rules }) => (
                <Form.Item {...{ key, name, label, rules }}>
                  {name === "login" ? <Input allowClear /> : <Input.Password />}
                </Form.Item>
              ))}
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

export default LoginPage;
