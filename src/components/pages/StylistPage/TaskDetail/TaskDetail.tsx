import { Button, Form, Input, Select } from "antd";
import moment from "moment";
import { FC, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

import { TFormField } from "common/types/types";
import Loader from "components/modules/Loader";
import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { tasksThunks } from "redux/slicers/tasksPageSlice";
import { paths, StlPage, TASK_ID } from "../routes/consts";
import {
  BUTTON,
  COMMENT,
  CREATED_AT,
  DATE,
  formFields,
  STATUS,
  TIME,
  TYPE,
  UPDATED_AT,
} from "./consts";
import styles from "./TaskDetail.module.scss";

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

const TaskDetail: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as any;
  const [saveLoading, setSaveLoading] = useState(false);
  const history = useHistory();

  const { task, types, statuses } = useSelector(
    (state: TRootState) => state.tasksPage
  );

  const compilationId = task?.compilation?.id;
  const userName = task?.user?.name;

  useEffect(() => {
    (async () => {
      await dispatch(tasksThunks.getTaskStatuses());
      await dispatch(tasksThunks.getTaskTypes());
      dispatch(tasksThunks.getTask(id));
    })();

    return () => dispatch(tasksThunks.clearTask());
  }, [dispatch, id]);

  const onFinish = async (payload: any) => {
    setSaveLoading(true);
    await dispatch(tasksThunks.updateTask(id, payload));
    setSaveLoading(false);
    history.push(paths[StlPage.TASKS]);
  };

  function getFormField(type: string, field: TFormField) {
    const options = type === STATUS ? statuses : types;

    switch (type) {
      case CREATED_AT:
      case UPDATED_AT:
      case DATE:
        return (
          <Form.Item
            name={field.name}
            label={field.label}
            rules={[{ required: true, type: "string", max: 99 }]}
          >
            <Input readOnly={field.readonly} />
          </Form.Item>
        );
      case TIME:
        return (
          <Form.Item
            name={field.name}
            label={field.label}
            rules={[{ required: true, type: "string", max: 99 }]}
          >
            <Input readOnly={field.readonly} />
          </Form.Item>
        );
      case STATUS:
      case TYPE:
        return (
          <Form.Item
            name={field.name}
            label={field.label}
            rules={[{ required: true }]}
          >
            <Select open={field.readonly ? false : undefined}>
              {options
                .map((type) => ({
                  value: type.id,
                  title: type.title,
                }))
                .map((option, index) => (
                  <Option
                    key={`task-${field.name}` + index}
                    value={option.value}
                  >
                    {option.title}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        );
      case BUTTON:
        return (
          task.status.title !== 'Завершена' && <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button loading={saveLoading} type="primary" htmlType="submit">
              {field.label}
            </Button>
          </Form.Item>
        );
      case COMMENT:
        return (
          <Form.Item
            name={field.name}
            label={field.label}
            rules={[{ required: true }]}
          >
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
        {!compilationId && task?.id && types && statuses && (
          <Link
            className={styles["create-compilation-btn"]}
            to={`${paths[StlPage.COMPILATIONS_CREATE].replace(TASK_ID, id)}`}
          >
            <Button type="primary">Создать подборку</Button>
          </Link>
        )}
      </div>
      {task.id && types && statuses && (
        <>
          <div className={styles["link-rows"]}>
            {compilationId && (
              <div className={styles["link-row"]}>
                <span>Подборка:</span>
                <Link to={`${paths[StlPage.COMPILATIONS]}/${compilationId}`}>
                  Подборка №{compilationId}
                </Link>
              </div>
            )}
            <div className={styles["link-row"]}>
              <span>Пользователь:</span>
              <Link to={`${paths[StlPage.USERS]}/${task.user.id}`}>{userName}</Link>
            </div>
          </div>
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
        </>
      )}
      {!(task.id && types && statuses) && <Loader />}
    </div>
  );
};

export default memo(TaskDetail);
