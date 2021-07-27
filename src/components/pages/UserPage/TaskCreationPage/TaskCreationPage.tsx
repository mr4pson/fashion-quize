import { Button, Card, DatePicker, Form, Input, Select } from "antd";
import { TypeFormField } from "common/types/type";
import React, { memo, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { TypeRootState } from "redux/ReduxStore";
import { tasksThunks } from "redux/slicers/tasksPageSlice";
import { paths, UsrPage } from "../routes/consts";
import {
  COMMENT,
  DATE,
  formFields,
  TYPE,
} from "./constants";
import styles from "./TaskCreationPage.module.scss";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} не может быть пустым!",
  string: {
    max: "${label} не может быть длиннее ${max} символов!",
  },
};
/* eslint-enable no-template-curly-in-string */

export const TaskCreationPage: React.FC = () => {
  const history = useHistory();
  const [saveLoading, setSaveLoading] = useState(false);
  const dispatch = useDispatch();

  const { types, loading } = useSelector((state: TypeRootState) => ({
    task: state.tasksPage.task,
    types: state.tasksPage.types,
    statuses: state.tasksPage.statuses,
    loading: state.tasksPage.loading,
  }));

  useEffect(() => {
    (async () => {
      await dispatch(tasksThunks.getTaskStatuses());
      dispatch(tasksThunks.getTaskTypes());
    })();
  }, [dispatch]);

  function getFormField(type: string, field: TypeFormField) {
    const options = types;
    switch (type) {
      case DATE:
        return (
          <Form.Item
            name={field.name}
            label={field.label}
            rules={[{ required: true, type: "date" }]}
          >
            <DatePicker disabledDate={(date) => date.toDate() < new Date()} className={styles['date-picker']}/>
          </Form.Item>
        );
      case TYPE:
        return (
          <Form.Item
            name={field.name}
            label={field.label}
            rules={[{ required: true }]}
          >
            <Select>
              {options
                .map((type) => ({
                  value: type.id,
                  title: type.title,
                }))
                .map((option, index) => (
                  <Select.Option
                    key={`task-${field.name}` + index}
                    value={option.value}
                  >
                    {option.title}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        );
      case COMMENT:
        return (
          <Form.Item
            name={field.name}
            label={field.label}
          >
            <Input.TextArea/>
          </Form.Item>
        );
      default:
        return <></>;
    }
  }

  const onFinish = async (formData) => {
    if (formData.date) {
      const payload = {
        ...formData,
        date: formData.date.format('DD.MM.YYYY'),
      }
      await dispatch(tasksThunks.createTask(payload));
      history.push(paths[UsrPage.TASKS]);
    }
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Card
        loading={loading}
        title={
          <div className={styles["header"]}>
            <h2 className={styles["title"]}>Создание задачи</h2>
            <Button loading={saveLoading} type="primary" htmlType="submit">Добавить</Button>
          </div>
        }
        bordered={false}
      >
        {formFields.map((field) => (
          <div key={field.id} className={styles["detail__field"]}>
            {getFormField(field.type, field)}
          </div>
        ))}
      </Card>
    </Form>
  );
};

export default memo(TaskCreationPage);
