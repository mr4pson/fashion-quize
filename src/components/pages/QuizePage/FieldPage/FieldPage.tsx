import { RightOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { FC, memo } from "react";
import { useHistory } from "react-router";

import { TypeDispatch, useAppDispatch } from "redux/ReduxStore";
import { Page, paths } from "routes/constants";
import styles from "./FieldPage.module.scss";

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "Необходимо заполнить поле!",
  types: {
    email: "Некорректно введён email!",
  },
};
/* eslint-enable no-template-curly-in-string */

type Props = {
  next: Page;
  thunk: (payload: any) => (dispatch: TypeDispatch) => Promise<void>;
  type: string;
  title: string;
};

const FieldPage: FC<Props> = (props) => {
  const history = useHistory();

  const dispatch = useAppDispatch();

  const onFinish = (form) => {
    dispatch(props.thunk(form.field));
    history.push(paths[props.next]);
  };

  const onFinishFailed = (e) => {
    console.log(e);
  };

  const getFieldBody = (type: string) =>
    ({
      text: (
        <Form.Item name="field" rules={[{ required: true }]}>
          <Input type={props.type} className={styles["field__input"]} maxLength={70} />
        </Form.Item>
      ),
      email: (
        <Form.Item name="field" rules={[{ required: true, type: "email" }]}>
          <Input type={props.type} className={styles["field__input"]} />
        </Form.Item>
      ),
      number: (
        <Form.Item name="field" rules={[{ required: true }]}>
          <Input type={props.type} className={styles["field__input"]} min={6} max={100} />
        </Form.Item>
      ),
    }[type]);

  return (
    <div className={styles["field-page"]}>
      <div className={styles["field-page__title"]}>{props.title}</div>
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} validateMessages={validateMessages}>
        <div className={styles["field-page__body"]}>{getFieldBody(props.type)}</div>
        <Button htmlType="submit" className={styles["next-button"]}>
          <RightOutlined />
        </Button>
      </Form>
    </div>
  );
};

export default memo(FieldPage);
