import { Button, DatePicker, Form, Input, Select } from "antd";
import { MaskedInput } from "antd-mask-input";
import classNames from "classnames";
import { ETheme } from "common/types/types";
import QuizeHeader from "components/pages/QuizePage/QuizeHeader";
import { TQuizeHeaderConfig } from "components/pages/QuizePage/QuizeHeader/types";
import moment from "moment";
import "moment/locale/ru";
import React, { FC, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { tasksThunks } from "redux/slicers/tasksPageSlice";
import { themeThunks } from "redux/slicers/themeSlice";
import { paths, UsrPage } from "../routes/consts";
import { FieldTypes, fields } from "./constants";
import { handleTimeChange } from "./helpers";
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
  const { types } = useSelector((state: TRootState) => state.tasksPage);
  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      await dispatch(tasksThunks.getTaskStatuses());
      dispatch(tasksThunks.getTaskTypes());
    })();

    dispatch(themeThunks.setTheme(ETheme.DARK));
    window.scrollTo(0, 0);

    return () => {
      dispatch(themeThunks.setTheme(ETheme.LIGHT));
    };
  }, [dispatch]);

  const onFinish = async (formData) => {
    const payload = {
      ...formData,
      date: moment(formData.date).format("DD.MM.YYYY"),
    };
    await dispatch(tasksThunks.createTask(payload));
    history.push(paths[UsrPage.TASKS]);
  };

  const onFinishFailed = (e) => {
    console.log(e);
  };

  const headerConfig: TQuizeHeaderConfig = {
    title: "Создание задачи",
    sectionLength: 0,
    description: "Укажите что и когда вы хотели бы опробовать",
  };

  const options = types?.map((type) => ({
    value: type.id,
    title: type.title,
  }));

  return (
    <div
      className={classNames(styles["task-creation-page"], "task-creation-page")}
    >
      <div className={styles["task-creation-page__blank"]}>
        <QuizeHeader {...headerConfig} />
        <div className={styles["task-creation-form"]}>
          <Form
            name="basic"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            validateMessages={validateMessages}
          >
            <div className={styles["task-creation-form__body"]}>
              {fields.map(({ key, name, label, rules, mask, type }) => (
                <Form.Item {...{ key, name, label, rules }}>
                  {type === FieldTypes.TYPE && (
                    <Select>
                      {options.map(({ value, title }, index) => (
                        <Select.Option
                          key={`task-${name}` + index}
                          value={value}
                        >
                          {title}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                  {type === FieldTypes.DATE && (
                    <DatePicker
                      format={"DD.MM.YYYY"}
                      className={styles["form-item__date"]}
                    />
                  )}
                  {![FieldTypes.TYPE, FieldTypes.DATE].includes(type) &&
                    (mask ? (
                      <MaskedInput
                        mask={mask}
                        allowClear
                        onChange={(e) => handleTimeChange(e, form)}
                      />
                    ) : (
                      <Input allowClear />
                    ))}
                </Form.Item>
              ))}
            </div>
            <div className={styles["task-creation-form__footer"]}>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                loading={saveLoading}
              >
                Создать
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default memo(TaskCreationPage);
