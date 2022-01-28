import { FC, FormEvent, memo } from "react";
import { useHistory } from "react-router";

import { getFormValues } from "common/helpers";
import { BMixin, Button, Input } from "components/modules";
import Header from "components/modules/Header";
import { useAuth } from "hooks/useAuth";
import { Page, paths } from "routes/constants";
import s from "./LoginPage.module.scss";

const LoginPage: FC = () => {
  const history = useHistory();
  const { login } = useAuth(history);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(getFormValues(e.target));
  };

  const linkToResetPassword = () => history.push(paths[Page.RESET_PASSWORD]);

  return (
    <>
      <Header />
      <div className={s["login-page"]}>
        <div className={s["login-card"]}>
          <h4 className={s["login-card__title"]}>Авторизация</h4>
          <form className={s["login-card__form"]} onSubmit={handleSubmit}>
            <Input name="login" label="Email" type="email" required />
            <Input name="password" label="Пароль" type="password" required />
            <div className={s["login-card__form-btn"]}>
              <Button type="submit" mixin={[BMixin.FIX, BMixin.PRIMARY]}>
                Войти
              </Button>
            </div>
          </form>
          <span className={s["login-card__reset-pass"]} onClick={linkToResetPassword}>
            Забыли пароль?
          </span>
        </div>
      </div>
    </>
  );
};

export default memo(LoginPage);
