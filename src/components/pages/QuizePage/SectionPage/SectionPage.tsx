import { Checkbox, Form, Input, Radio, Space } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";

import { TRootState } from "redux/ReduxStore";
import { QuestionType } from "../types";
import { getQuestionOptions } from "./helpers";
import s from "./SectionPage.module.scss";

const SectionPage: FC = () => {
  const { currentBlock } = useSelector((state: TRootState) => state.quizePage);

  const getLabel = ({ title, description }) => (
    <>
      <div className={s["section-form__title"]}>{title}</div>
      <div className={s["section-form__desc"]}>{description}</div>
    </>
  );

  const getDirection = (directionAlignment) =>
    ({
      ["VERTICAL"]: { direction: "vertical" },
      ["HORIZONTAL"]: { direction: "horizontal" },
    }[directionAlignment]);

  const getField = (question) => {
    const { directionAlignment, type, options } = question;

    const field = {
      [QuestionType.INPUT]: <Input allowClear />,
      [QuestionType.TEXT]: <Input allowClear />,
      ...(Array.isArray(getQuestionOptions(options)) && {
        [QuestionType.SINGLE_OPTION]: (
          <Radio.Group>
            <Space {...getDirection(directionAlignment)} size={[0, 16]} wrap>
              {getQuestionOptions(options).map((option, optionIndex) => (
                <Radio value={option} key={optionIndex} style={{ ["HORIZONTAL"]: { width: 220 } }[directionAlignment]}>
                  {option}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        ),
        [QuestionType.MULTIPLE_OPTION]: (
          <Checkbox.Group>
            <Space size={[0, 16]} wrap>
              {getQuestionOptions(options).map((option, optionIndex) => (
                <Checkbox value={option} key={optionIndex} style={{ width: 350 }}>
                  {option}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        ),
      }),
    }[type];

    return field;
  };

  return (
    <div className={s["section-form"]}>
      {currentBlock.questions?.map(({ id, ...question }) => (
        <Form.Item key={id} name={id} label={getLabel(question)} rules={[{ required: true }]}>
          {getField(question)}
        </Form.Item>
      ))}
    </div>
  );
};

export default SectionPage;
