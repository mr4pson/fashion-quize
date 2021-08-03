import { Button, Card, DatePicker, Form, Input, Select } from "antd";
import locale from "antd/es/date-picker/locale/ru_RU";
import "moment/locale/ru";
import { FC, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import { TFormField } from "common/types/types";
import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { tasksThunks } from "redux/slicers/tasksPageSlice";
import { paths, UsrPage } from "../routes/consts";
import { formFields } from "./constants";
import styles from "./TaskCreationPage.module.scss";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const picker = {
  showTime: true,
  locale: locale,
  disabledDate: (date: moment.Moment) => date.toDate() < new Date(),
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} не может быть пустым!",
};
/* eslint-enable no-template-curly-in-string */

export const TaskCreationPage: FC = () => {
  const history = useHistory();
  const [saveLoading, setSaveLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { types, loading } = useSelector((state: TRootState) => state.tasksPage);

  useEffect(() => {
    (async () => {
      await dispatch(tasksThunks.getTaskStatuses());
      dispatch(tasksThunks.getTaskTypes());
    })();
  }, [dispatch]);

  const getFormField = (type: string, field: TFormField) => {
    const options = types.map((type) => ({ value: type.id, title: type.title }));

    return {
      DATE: (
        <Form.Item rules={[{ required: true }]} name={field.name} label={field.label}>
          <DatePicker className={styles["date-picker"]} {...picker} />
        </Form.Item>
      ),
      TYPE: (
        <Form.Item rules={[{ required: true }]} name={field.name} label={field.label}>
          <Select>
            {options.map((option, index) => (
              <Select.Option key={`task-${field.name}` + index} value={option.value}>
                {option.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      ),
      COMMENT: (
        <Form.Item name={field.name} label={field.label}>
          <Input.TextArea />
        </Form.Item>
      ),
    }[type];
  };

  const getCreationTitle = () => (
    <div className={styles["header"]}>
      <h2 className={styles["title"]}>Создание задачи</h2>
      <Button type="primary" htmlType="submit" loading={saveLoading}>
        Добавить
      </Button>
    </div>
  );

  const onFinish = async (formData) => {
    if (formData.date) {
      const payload = {
        ...formData,
        date: formData.date.format("DD.MM.YYYY"),
      };
      await dispatch(tasksThunks.createTask(payload));
      history.push(paths[UsrPage.TASKS]);
    }
  };

  return (
    <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} {...layout}>
      <Card bordered={false} loading={loading} title={getCreationTitle()}>
        {formFields.map((field) => (
          <div className={styles["detail__field"]} key={field.id}>
            {getFormField(field.type, field)}
          </div>
        ))}
      </Card>
    </Form>
  );
};

export default memo(TaskCreationPage);
