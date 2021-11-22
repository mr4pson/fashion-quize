import { Button, Form, Input, Select } from "antd";
import classNames from "classnames";
import QuizeHeader from "components/pages/QuizePage/QuizeHeader";
import { TQuizeHeaderConfig } from "components/pages/QuizePage/QuizeHeader/types";
import "moment/locale/ru";
import React, { FC, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { tasksThunks } from "redux/slicers/tasksPageSlice";
import { paths, UsrPage } from "../routes/consts";
import { FieldTypes, formFields } from "./constants";
import styles from "./TaskCreationPage.module.scss";

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} не может быть пустым!",
};
/* eslint-enable no-template-curly-in-string */

export const TaskCreationPage: FC = () => {
  const history = useHistory();
  const [saveLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { types, loading } = useSelector(
    (state: TRootState) => state.tasksPage
  );

  useEffect(() => {
    (async () => {
      await dispatch(tasksThunks.getTaskStatuses());
      dispatch(tasksThunks.getTaskTypes());
    })();
  }, [dispatch]);

  const onFinish = async (formData) => {
    const payload = {
      ...formData,
    };
    await dispatch(tasksThunks.createTask(payload));
    history.push(paths[UsrPage.TASKS]);
  };

  const onFinishFailed = (e) => {
    console.log(e);
  };

  const headerConfig: TQuizeHeaderConfig = {
    title: "Создание задачи",
    currentSectionNumber: undefined,
    sectionLength: undefined,
    description: "Укажите что и когда вы хотели бы опробовать",
    backUrl: undefined,
  };

  const options = types?.map((type) => ({
    value: type.id,
    title: type.title,
  }));

  return (
    <div
      className={classNames(styles["task-creation-page"], "task-creation-page")}
    >
      <div className={classNames("container", styles["container"])}>
        <div className={styles["task-creation-page__blank"]}>
          <QuizeHeader {...headerConfig} />
          <div className={styles["task-creation-form"]}>
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              validateMessages={validateMessages}
            >
              <div className={styles["task-creation-form__body"]}>
                {formFields.map((field, index) => (
                  <React.Fragment key={index}>
                    {field.type === FieldTypes.TYPE && (
                      <Form.Item
                        key={`field-${index}`}
                        className={classNames(
                          styles["task-creation-form__form-item"],
                          styles["form-item"]
                        )}
                        label={
                          <label
                            className={styles["form-item__label"]}
                            htmlFor={field.name}
                          >
                            {field.label}
                          </label>
                        }
                        name={field.name}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select>
                          {options.map((option, index) => (
                            <Select.Option
                              key={`task-${field.name}` + index}
                              value={option.value}
                            >
                              {option.title}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    )}
                    {field.type === FieldTypes.COMMENT && (
                      <Form.Item
                        key={`field-${index}`}
                        className={classNames(
                          styles["task-creation-form__form-item"],
                          styles["form-item"]
                        )}
                        label={
                          <label
                            className={styles["form-item__label"]}
                            htmlFor={field.name}
                          >
                            {field.label}
                          </label>
                        }
                        name={field.name}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input.TextArea
                          className={styles["form-item__input"]}
                        />
                      </Form.Item>
                    )}
                    {field.type === FieldTypes.DATE && (
                      <Form.Item
                        key={`field-${index}`}
                        className={classNames(
                          styles["task-creation-form__form-item"],
                          styles["form-item"]
                        )}
                        label={
                          <label
                            className={styles["form-item__label"]}
                            htmlFor={field.name}
                          >
                            {field.label}
                          </label>
                        }
                        name={field.name}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input className={styles["form-item__input"]} />
                      </Form.Item>
                    )}
                    {field.type === FieldTypes.TIME && (
                      <Form.Item
                        key={`field-${index}`}
                        className={classNames(
                          styles["task-creation-form__form-item"],
                          styles["form-item"]
                        )}
                        label={
                          <label
                            className={styles["form-item__label"]}
                            htmlFor={field.name}
                          >
                            {field.label}
                          </label>
                        }
                        name={field.name}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input className={styles["form-item__input"]} />
                      </Form.Item>
                    )}
                  </React.Fragment>
                ))}
                <Button
                  htmlType="submit"
                  className={styles["task-creation-form__submit-btn"]}
                  loading={saveLoading}
                >
                  Создать
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TaskCreationPage);
