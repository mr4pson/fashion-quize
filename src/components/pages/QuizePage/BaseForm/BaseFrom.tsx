import { Button, Checkbox, Form, Input } from "antd";
import { MaskedInput } from "antd-mask-input";
import classNames from "classnames";
import { FC, memo, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAppDispatch } from "redux/ReduxStore";
import { quizeThunks } from "redux/slicers/quizePageSlice";
import { paths, QzPage } from "../routes/constants";
import styles from "./BaseForm.module.scss";
import { fields } from "./constants";
import { TBaseFields } from "./types";

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "Необходимо заполнить поле!",
  types: {
    email: "Некорректно введён email!",
  },
};
/* eslint-enable no-template-curly-in-string */

type Props = {};

const BaseForm: FC<Props> = (props) => {
  const [isAgreedWithPolicy, setIsAgreedWithPolicy] = useState(false);
  const history = useHistory();

  const dispatch = useAppDispatch();

  const onFinish = async (form: TBaseFields) => {
    const response: any = await dispatch(quizeThunks.checkEmail(form.email));
    if (!response || !response.status) {
      return;
    }

    dispatch(quizeThunks.setBaseFields(form));
    history.push(paths[QzPage.SEX]);
  };

  const onFinishFailed = (e) => {
    console.log(e);
  };

  const handleChangeAgreeWithPolicy = (e) => {
    setIsAgreedWithPolicy(e.target.checked);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className={styles["base-page"]}>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
      >
        <div className={styles["base-page__body"]}>
          {fields.map((field, index) => (
            <Form.Item
              key={`field-${index}`}
              className={classNames(
                styles["base-page__form-item"],
                styles["form-item"]
              )}
              label={
                <label
                  className={styles["form-item__label"]}
                  htmlFor={field.name}
                >
                  {field.placeholder}
                </label>
              }
              name={field.name}
              rules={[
                {
                  required: true,
                  type:
                    field.type === "email" ? (field.type as any) : undefined,
                  message:
                    field.type === "email" ? (field.message as any) : undefined,
                },
              ]}
            >
              {field.name === "phone" ? (
                <MaskedInput mask="+7(111)-111-11-11" />
              ) : (
                <Input className={styles["form-item__input"]} />
              )}
            </Form.Item>
          ))}
          <Checkbox onChange={handleChangeAgreeWithPolicy}>
            <div className={styles["form-item__checkbox"]}>
              <span>
                Я даю согласие на обработку персональных данных и соглашаюсь
              </span>
              <Button type={"link"}>с политикой конфиденциальности</Button>
            </div>
          </Checkbox>
          <Button
            htmlType="submit"
            className={styles["base-page__submit-btn"]}
            disabled={!isAgreedWithPolicy}
          >
            Продолжить
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default memo(BaseForm);
