import { Button, Form, Input, Select } from "antd";
import { TypeFormField } from "common/types/type";
import moment from "moment";
import { FC, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import { TypeRootState, useAppDispatch } from "redux/ReduxStore";
import { tasksThunks } from "redux/slicers/tasksPageSlice";
import { paths, StlPage } from "../routes/consts";
import { BUTTON, COMMENT, CREATED_AT, DATE, formFields, STATUS, TYPE, UPDATED_AT } from "./constants";
import styles from "./TaskPageDetail.module.scss";

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

const { Option } = Select;

const TaskPageDetail: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as any;
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { task, types, statuses } = useSelector((state: TypeRootState) => ({
    task: state.tasksPage.task,
    statuses: state.tasksPage.statuses,
    types: state.tasksPage.types,
  }));

  useEffect(() => {
    (async () => {
      await dispatch(tasksThunks.getTaskStatuses());
      await dispatch(tasksThunks.getTaskTypes());
      dispatch(tasksThunks.getTask(id));
    })();

    return () => dispatch(tasksThunks.clearTask());
  }, [dispatch, id]);

  const onFinish = async (payload: any) => {
    setLoading(true);
    await dispatch(tasksThunks.updateTask(id, payload));
    setLoading(false);
    history.push(paths[StlPage.TASKS]);
  };

  function getFormField(type: string, field: TypeFormField) {
    const options = type === STATUS ? statuses : types;
    switch (type) {
      case CREATED_AT:
      case UPDATED_AT:
      case DATE:
        return (
          <Form.Item name={field.name} label={field.label} rules={[{ required: true, type: "string", max: 99 }]}>
            <Input readOnly={field.readonly} />
          </Form.Item>
        );
      case STATUS:
      case TYPE:
        return (
          <Form.Item name={field.name} label={field.label} rules={[{ required: true }]}>
            <Select open={field.readonly ? false : undefined}>
              {options
                .map((type) => ({
                  value: type.id,
                  title: type.title,
                }))
                .map((option, index) => (
                  <Option key={`task-${field.name}` + index} value={option.value}>
                    {option.title}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        );
      case BUTTON:
        return (
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button loading={loading} type="primary" htmlType="submit">
              {field.label}
            </Button>
          </Form.Item>
        );
      case COMMENT:
        return (
          <Form.Item name={field.name} label={field.label} rules={[{ required: true }]}>
            <Input.TextArea readOnly={field.readonly} />
          </Form.Item>
        );
      default:
        return <></>;
    }
  }

  const initialValues = {
    ...task,
    type: task?.type?.id,
    status: task?.status?.id,
    createdAt: moment(task?.createdAt).format("DD.MM.YYYY HH:mm:ss"),
    updatedAt: moment(task?.updatedAt).format("DD.MM.YYYY HH:mm:ss"),
  };

  return (
    <div className={styles["detail"]}>
      <div className={styles["detail__header"]}>
        <h1>Изменение задачи №{id}</h1>
      </div>
      {task.id && types && statuses && (
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          initialValues={initialValues}
        >
          {formFields.map((field) => (
            <div key={field.id} className={styles["detail__field"]}>
              {getFormField(field.type, field)}
            </div>
          ))}
        </Form>
      )}
    </div>
  );
};

export default memo(TaskPageDetail);