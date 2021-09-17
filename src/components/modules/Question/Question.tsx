import { Checkbox, Col, Form, Input, Radio, Row } from "antd";
import { FC, memo } from "react";

import { getImageUrl } from "common/helpers/common-helpers";
import { QuestionType, TypeQuestion } from "components/pages/QuizePage/types";
import styles from "./Question.module.scss";
import { useEffect } from "react";

const { TextArea } = Input;

type TProps = {
  question: TypeQuestion;
  color: string | undefined;
};

const Question: FC<TProps> = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  if (!props.question?.block) {
    return <></>;
  }

  const { description, image, type, block, options } = props.question;
  const optionList = options ? (JSON.parse(options!) as string[]) : [];

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };

  const getQuestionBody = (type: string) =>
    ({
      [QuestionType.INPUT]: (
        <Form.Item name="answer" rules={[{ required: true }]}>
          <div
            style={{ color: props.color }}
            className={styles["question__item"]}
          >
            <Input autoFocus className={styles["question__input"]} maxLength={70} />
          </div>
        </Form.Item>
      ),
      [QuestionType.TEXT]: (
        <Form.Item name="answer" rules={[{ required: true }]}>
          <div
            style={{ color: props.color }}
            className={styles["question__item"]}
          >
            <TextArea autoFocus className={styles["question__text"]} />
          </div>
        </Form.Item>
      ),
      [QuestionType.SINGLE_OPTION]: (
        <Form.Item
          name="answer"
          rules={[{ required: true, message: "Необходимо выбрать пункт!" }]}
        >
          <Radio.Group>
            {optionList &&
              optionList.map((option, index) => (
                <Radio
                  key={index}
                  style={{ ...radioStyle, color: props.color }}
                  value={option}
                >
                  {option}
                </Radio>
              ))}
          </Radio.Group>
        </Form.Item>
      ),
      [QuestionType.MULTIPLE_OPTION]: (
        <Form.Item
          name="answer"
          rules={[
            {
              required: true,
              message: "Необходимо выбрать хотябы один пункт!",
            },
          ]}
        >
          <Checkbox.Group style={{ width: "100%" }}>
            {optionList &&
              optionList.map((option, index) => (
                <Row key={index}>
                  <Col span={24}>
                    <Checkbox style={{ color: props.color }} value={option}>
                      {option}
                    </Checkbox>
                  </Col>
                </Row>
              ))}
          </Checkbox.Group>
        </Form.Item>
      ),
    }[type]);

  return (
    <>
      <div className={styles["block"]}>
        <h1 className={styles["block__title"]}>{block.title}</h1>
      </div>
      <div className={styles["question"]}>
        <img alt="" className={styles["question__image"]} src={getImageUrl(image!)}/>
        <div className={styles["question__description"]}>{description}</div>
        <div className={styles["question__body"]}>{getQuestionBody(type)}</div>
      </div>
    </>
  );
};

export default memo(Question);
