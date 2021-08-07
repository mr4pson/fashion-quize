import { Checkbox, Col, Form, Input, Radio, Row } from "antd";
import { FC, memo } from "react";

import { getImageUrl } from "common/helpers/common-helpers";
import { QuestionType, TypeQuestion } from "components/pages/QuizePage/types";
import styles from "./Question.module.scss";

const { TextArea } = Input;

type TProps = {
  question: TypeQuestion;
};

const Question: FC<TProps> = (props) => {
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

  const getQuestion = (type: string) =>
    ({
      [QuestionType.INPUT]: (
        <Form.Item name="answer" rules={[{ required: true }]}>
          <Input className={styles["question__input"]} maxLength={70} />
        </Form.Item>
      ),
      [QuestionType.TEXT]: (
        <Form.Item name="answer" rules={[{ required: true }]}>
          <TextArea className={styles["question__text"]} />
        </Form.Item>
      ),
      [QuestionType.SINGLE_OPTION]: (
        <Form.Item name="answer" rules={[{ required: true, message: "Необходимо выбрать пункт!" }]}>
          <Radio.Group>
            {optionList &&
              optionList.map((option, index) => (
                <Radio key={index} style={radioStyle} value={option}>
                  {option}
                </Radio>
              ))}
          </Radio.Group>
        </Form.Item>
      ),
      [QuestionType.MULTIPLE_OPTION]: (
        <Form.Item name="answer" rules={[{ required: true, message: "Необходимо выбрать хотябы один пункт!" }]}>
          <Checkbox.Group style={{ width: "100%" }}>
            {optionList &&
              optionList.map((option, index) => (
                <Row key={index}>
                  <Col span={24}>
                    <Checkbox value={option}>{option}</Checkbox>
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
        <div style={{ backgroundImage: `url(${getImageUrl(image!)})` }} className={styles["question__image"]} />
        <div className={styles["question__description"]}>{description}</div>
        <div className={styles["question__body"]}>{getQuestion(type)}</div>
      </div>
    </>
  );
};

export default memo(Question);
