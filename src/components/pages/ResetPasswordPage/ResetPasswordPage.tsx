import { Button, Form, Input } from "antd";
import { FC, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useAppDispatch } from "redux/ReduxStore";

import { Footer, Header } from "components/modules";
import { resetPasswordThunks } from "redux/slicers/resetPasswordPageSlice";
import { Page, paths } from "routes/constants";
import { field, validateMessages } from "./consts";
import s from "./ResetPasswordPage.module.scss";

const ResetPasswordPage: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);
  const token = queryParams.get("token");

  const onFinish = async ({ login }) => {
    await dispatch(resetPasswordThunks.resetPassword(login));
    history.push(paths[Page.LOGIN]);
  }

  useEffect(() => {
    if (token) {
      (async () => {
        const isPasswordRefreshed = (await dispatch(
          resetPasswordThunks.sendPasswordResetRequest(token)
        )) as any;
        if (!isPasswordRefreshed) history.push(paths[Page.RESET_PASSWORD]);
      })();
    }
  }, [history, dispatch, token]);

  return (
    <>
      <Header />
      <div className={s["reset-password-page"]}>
        {token ? (
          <div className={s["reset-password-card"]}>
            <h4 className={s["reset-password-card__title"]}>
              Идет Восстановление пароля...
            </h4>
          </div>
        ) : (
          <div className={s["reset-password-card"]}>
            <h4 className={s["reset-password-card__title"]}>
              Восстановление пароля
            </h4>
            <Form
              className={s["reset-password-form"]}
              validateMessages={validateMessages}
              onFinish={onFinish}
              autoComplete="off"
            >
              <div className={s["reset-password-form__body"]}>
                <Form.Item {...field}>
                  <Input allowClear />
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

export default ResetPasswordPage;
