import { FC, FormEvent, memo, useEffect } from "react";
import { useHistory, useLocation } from "react-router";

import { BMixin, Button, Input } from "components/modules";
import Header from "components/modules/Header";
import { useAppDispatch } from "redux/ReduxStore";
import { resetPasswordThunks } from "redux/slicers/resetPasswordPageSlice";
import { Page, paths } from "routes/constants";
import s from "./ResetPasswordPage.module.scss";

const ResetPasswordPage: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);
  const token = queryParams.get("token");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPasswordThunks.resetPassword(e.target["login"].value));
  };

  useEffect(() => {
    if (token) {
      (async () => {
        const isPasswordRefreshed = (await dispatch(resetPasswordThunks.sendPasswordResetRequest(token))) as any;
        if (!isPasswordRefreshed) history.push(paths[Page.RESET_PASSWORD]);
      })();
    }
  }, [history, dispatch, token]);

  return (
    <>
      <Header />
      <div className={s["reset-password-page"]}>
        {token ? (
          <h1 className={s["reset-password-title"]}>Восстановление пароля...</h1>
        ) : (
          <div className={s["reset-password-card"]}>
            <h4 className={s["reset-password-card__title"]}>Восстановление пароля</h4>
            <form className={s["reset-password-card__form"]} onSubmit={handleSubmit}>
              <Input name="login" label="Email" type="email" required />
              <div className={s["reset-password-card__form-btn"]}>
                <Button type="submit" mixin={[BMixin.FIX, BMixin.PRIMARY]}>
                  Отправить
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(ResetPasswordPage);
