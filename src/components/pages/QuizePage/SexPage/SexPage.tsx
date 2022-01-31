import { Form, Radio, Space } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";

import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { setSex } from "redux/slicers/quizePageSlice";
import { radios } from "./consts";
import s from "./SexPage.module.scss";

const SexPage: FC = () => {
  const dispatch = useAppDispatch();
  const { sex } = useSelector((state: TRootState) => state.quizePage);

  const onChange = ({ target }) => dispatch(setSex(target.value.type));

  const sexClassName = ({ type }, label?) => {
    if (label) {
      return sex === type ? s["sex-form__col__radio_active"] : s["sex-form__col__radio"];
    } else {
      if (type === "FEMALE") {
        return sex === type ? s["sex-form__col__female_active"] : s["sex-form__col__female"];
      } else {
        return sex === type ? s["sex-form__col__male_active"] : s["sex-form__col__male"];
      }
    }
  };

  return (
    <div className={s["sex-page"]}>
      <Form.Item name="sex" initialValue={sex}>
        <Radio.Group onChange={onChange}>
          <Space direction="horizontal" size={40}>
            {radios.map(({ key, label, value }) => (
              <label className={s["sex-form__col"]} key={key}>
                <div className={sexClassName(value)} />
                <Radio className={sexClassName(value, label)} value={value}>
                  {label}
                </Radio>
              </label>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>
    </div>
  );
};

export default SexPage;
