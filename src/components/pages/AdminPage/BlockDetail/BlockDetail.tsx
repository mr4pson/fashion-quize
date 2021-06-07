import { Button, Form, Input } from "antd";
import { memo } from "react";
import { useParams } from "react-router";
import styles from "./BlockDetail.module.scss";
import { BUTTON, COLOR, formFields, TITLE } from "./constants";
import { TypeFormField } from "./type";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} не может быть пустым!",
  string: {
    max: "${label} не может быть длиннее ${max} символов",
  },
};
/* eslint-enable no-template-curly-in-string */

const BlockDetail: React.FC = () => {
  const { id } = useParams() as any;

  function onFinish(values: any) {
    console.log(values);
  }

  function getFormField(type: string, field: TypeFormField) {
    switch (type) {
      case TITLE:
      case COLOR:
        return (
          <Form.Item
            name={[field.name]}
            label={field.label}
            rules={[{ required: true, type: "string", max: 99 }]}
          >
            <Input />
          </Form.Item>
        );
      case BUTTON:
        return (
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" size="large">
              {field.label}
            </Button>
          </Form.Item>
        );
      default:
        return <></>;
    }
  }

  return (
    <div className={styles["detail"]}>
      <div className={styles["detail__header"]}>
        <h1>{}</h1>
      </div>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        {formFields.map((field) => (
          <div key={field.id} className={styles["detail__field"]}>
            {getFormField(field.type, field)}
          </div>
        ))}
      </Form>
    </div>
  );
};

export default memo(BlockDetail);
