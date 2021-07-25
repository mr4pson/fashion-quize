import { Button, Form, FormInstance, Input } from "antd";
import { memo, useRef } from "react";
import { useHistory } from "react-router";
import styles from "./EmailPage.module.scss";
import { RightOutlined } from "@ant-design/icons";
import { Page, paths } from "routes/constants";
import { useDispatch, useSelector } from "react-redux";
import { quizeThunks } from "redux/slicers/quizePageSlice";
import { TypeRootState } from "redux/ReduxStore";
import { useEffect } from "react";

const EmailPage: React.FC = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { name } = useSelector((state: TypeRootState) => ({
    name: state.quizePage.name,
  }));

  const onFinish = (form) => {
    dispatch(quizeThunks.setEmail(form.email));
    history.push(paths[Page.QUIZE_SEX]);
  };

  const onFinishFailed = (e) => {
    console.log(e);
  };

  useEffect(() => {
    if (!name) {
      // history.push(paths[Page.QUIZE_SEX]);
    }
  }, [name]);

  return (
    <div className={styles["email-page"]}>
      <div className={styles["email-page__title"]}>Введите ваш email</div>
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <div className={styles["email-page__body"]}>
          <Form.Item name="email">
            <Input type="email" className={styles["email__input"]} />
          </Form.Item>
        </div>

        <Button htmlType="submit" className={styles["next-button"]}>
          <RightOutlined />
        </Button>
      </Form>
    </div>
  );
};

export default memo(EmailPage);
