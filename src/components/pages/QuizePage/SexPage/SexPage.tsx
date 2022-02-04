import { Form, Radio } from "antd";
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

  const sexClassName = (value, label?) => {
    if (label) {
      return sex === value.type ? s["sex-form__radio_active"] : s["sex-form__radio"];
    } else {
      return sex === value.type ? s["sex-form__img-wrap_active"] : s["sex-form__img-wrap"];
    }
  };

  return (
    <div className={s["sex-page"]}>
      <Form.Item name="sex" initialValue={sex}>
        <Radio.Group onChange={onChange}>
          <div className={s["sex-form__grp"]}>
            {radios.map(({ key, label, src, value }) => (
              <label className={s["sex-form__lbl"]} key={key}>
                <div className={sexClassName(value)}>
                  <img className={s["sex-form__img-src"]} src={src} alt="" />
                </div>
                <Radio className={sexClassName(value, label)} value={value}>
                  {label}
                </Radio>
              </label>
            ))}
          </div>
        </Radio.Group>
      </Form.Item>
    </div>
  );
};

export default SexPage;
