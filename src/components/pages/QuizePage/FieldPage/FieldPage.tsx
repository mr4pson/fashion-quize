import { RightOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { TypeDispatch } from "redux/ReduxStore";
import { Page, paths } from "routes/constants";
import styles from "./FieldPage.module.scss";

type Props = {
  next: Page;
  thunk: (payload: any) => (dispatch: TypeDispatch) => Promise<void>;
  type: string;
  title: string;
}

const FieldPage: React.FC<Props> = (props) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const onFinish = (form) => {
    dispatch(props.thunk(form.field));
    history.push(paths[props.next]);
  };

  const onFinishFailed = (e) => {
    console.log(e);
  };

  return (
    <div className={styles["field-page"]}>
      <div className={styles["field-page__title"]}>{props.title}</div>
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <div className={styles["field-page__body"]}>
          <Form.Item name="field">
            <Input type={props.type} className={styles["field__input"]} />
          </Form.Item>
        </div>
        <Button htmlType="submit" className={styles["next-button"]}>
          <RightOutlined />
        </Button>
      </Form>
    </div>
  );
};

export default memo(FieldPage);
