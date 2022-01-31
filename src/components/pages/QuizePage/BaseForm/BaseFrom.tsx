import { Button, Checkbox, Form, Input } from "antd";
import { MaskedInput } from "antd-mask-input";
import { FC } from "react";
import { useSelector } from "react-redux";

import { TRootState } from "redux/ReduxStore";
import s from "./BaseForm.module.scss";
import { checkbox, fields } from "./consts";

const BaseForm: FC = () => {
  const { baseFields } = useSelector((state: TRootState) => state.quizePage);

  return (
    <>
      <div className={s["base-form__body"]}>
        {fields.map(({ key, name, label, rules, mask }) => (
          <Form.Item {...{ key, name, label, rules }} initialValue={baseFields[name]}>
            {mask ? <MaskedInput mask={mask} allowClear /> : <Input allowClear />}
          </Form.Item>
        ))}
      </div>
      <div className={s["base-form__policy"]}>
        <Form.Item {...checkbox}>
          <Checkbox>
            <span className={s["base-form__policy__text"]}>
              Я даю согласие на обработку персональных данных и соглашаюсь с{" "}
              <Button type="text">политикой конфиденциальности</Button>
            </span>
          </Checkbox>
        </Form.Item>
      </div>
    </>
  );
};

export default BaseForm;
