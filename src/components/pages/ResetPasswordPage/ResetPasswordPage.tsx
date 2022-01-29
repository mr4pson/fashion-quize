import { Button, Form, Input } from "antd";
import { FC, memo, useEffect } from "react";
import { useHistory, useLocation } from "react-router";

import { Footer, Header } from "components/modules";
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

  const onFinish = ({ login }) => dispatch(resetPasswordThunks.resetPassword(login));

  const validateMessages = {
    required: "Поле необходимо заполнить!",
    types: {
      email: "Email введён некорректно!",
    },
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
            <Form validateMessages={validateMessages} onFinish={onFinish} autoComplete="off">
              <div className={s["reset-password-form"]}>
                <label className={s["reset-password-form__lbl"]} htmlFor="login">
                  Email
                </label>
                <Form.Item rules={[{ type: "email", required: true }]} name="login">
                  <Input allowClear id="login" />
                </Form.Item>
              </div>
              <div className={s["reset-password-form__btn"]}>
                <Button type="primary" size="large" htmlType="submit">
                  Отправить
                </Button>
              </div>
            </Form>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default memo(ResetPasswordPage);
