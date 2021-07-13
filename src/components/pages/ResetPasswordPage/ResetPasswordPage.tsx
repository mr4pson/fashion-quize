import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { memo, useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLocation } from "react-router";
import { resetPasswordThunks } from "redux/slicers/resetPasswordPageSlice";
import { Page, paths } from "routes/constants";
import styles from './ResetPasswordPage.module.scss';

function ResetPasswordPage(): JSX.Element {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    useEffect(() => {
        if (token) {
            (async () => {
                const isPasswordRefreshed = await dispatch(resetPasswordThunks.sendPasswordResetRequest(token)) as any;
                if (!isPasswordRefreshed) {
                    history.push(paths[Page.RESET_PASSWORD]);
                }
            })()
        }
    }, [history, dispatch, token]);

    const onPasswordReset = async ({ login }: { login: string }) => {
        setLoading(true)
        await dispatch(resetPasswordThunks.resetPassword(login));
        setLoading(false);
    }

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };

    return (
        <div className={styles['reset-password-page']}>
            {!token && <div className={styles["reset-password-page__card"]}>
                <h1 className={styles["reset-password-page__title"]}>Восстановление пароля</h1>
                <Form name="basic" onFinish={onPasswordReset} onFinishFailed={onFinishFailed}>
                    <Form.Item name="login" rules={[{ required: true, type: "email", message: "Невалидный email" }]}>
                        <Input placeholder="Введите ваш email" />
                    </Form.Item>

                    <Form.Item>
                        <div className={styles["reset-password-btn-wrap"]}>
                            <Button loading={loading} type="primary" htmlType="submit">
                                Отправить
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>}
            {token && <div>
                <h1 className={styles["reset-password-page__title"]}>Восстановление пароля</h1>
            </div>}
        </div>
    );
}

export default memo(ResetPasswordPage);