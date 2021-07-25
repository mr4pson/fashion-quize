import { RightOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { quizeThunks } from "redux/slicers/quizePageSlice";
import { Page, paths } from "routes/constants";
import styles from "./NamePage.module.scss";

const NamePage: React.FC = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const onFinish = (form) => {
    dispatch(quizeThunks.setName(form.name));
    history.push(paths[Page.EMAIL_INPUT]);
  };

  const onFinishFailed = (e) => {
    console.log(e);
  };

  return (
    <div className={styles["name-page"]}>
      <div className={styles["name-page__title"]}>Введите ваше имя</div>
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <div className={styles["name-page__body"]}>
          <Form.Item name="name">
            <Input type="name" className={styles["name__input"]} />
          </Form.Item>
        </div>
        <Button htmlType="submit" className={styles["next-button"]}>
          <RightOutlined />
        </Button>
      </Form>
    </div>
  );
};

export default memo(NamePage);
