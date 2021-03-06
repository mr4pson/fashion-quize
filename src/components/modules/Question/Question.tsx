import { Checkbox, Col, Form, Input, Radio, Row } from "antd";
import { getImageUrl } from "common/helpers/common-helpers";
import { QuestionType, TypeQuestion } from "components/pages/QuizePage/types";
import { memo } from "react";
import styles from "./Question.module.scss";

const { TextArea } = Input;

type TypeQuestionProps = {
  question: TypeQuestion;
};

function Question(props: TypeQuestionProps): JSX.Element {
  if (!props.question?.block) {
    return <div></div>;
  }
  const { description, image, type, block, options } = props.question;
  const optionList = JSON.parse(options!) as string[];

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };

  return (
    <>
      <div className={styles["block"]}>
        <h1 className={styles["block__title"]}>{block.title}</h1>
      </div>
      <div className={styles["question"]}>
        <div style={{ backgroundImage: `url(${getImageUrl(image!)})` }} className={styles["question__image"]}></div>
        <div className={styles["question__description"]}>{description}</div>
        <div className={styles["question__body"]}>
          {type === QuestionType.INPUT && (
            <Form.Item name="answer">
              <Input className={styles["question__input"]} />
            </Form.Item>
          )}
          {type === QuestionType.TEXT && (
            <Form.Item name="answer">
              <TextArea className={styles["question__text"]} />
            </Form.Item>
          )}
          {type === QuestionType.SINGLE_OPTION && (
            <Form.Item name="answer">
              <Radio.Group>
                {optionList.map((option, index) => (
                  <Radio key={index} style={radioStyle} value={option}>
                    {option}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          )}
          {type === QuestionType.MULTIPLE_OPTION && (
            <Form.Item name="answer">
              <Checkbox.Group style={{ width: "100%" }}>
                {optionList.map((option, index) => (
                  <Row key={index}>
                    <Col span={24}>
                      <Checkbox value={option}>{option}</Checkbox>
                    </Col>
                  </Row>
                ))}
              </Checkbox.Group>
            </Form.Item>
          )}
        </div>
      </div>
    </>
  );
}

export default memo(Question);
