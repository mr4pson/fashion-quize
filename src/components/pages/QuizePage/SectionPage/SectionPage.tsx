import { Button, Checkbox, Col, Form, Input, Radio, Row } from "antd";
import React from "react";
import { FC, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { quizeThunks, setStateAnswers } from "redux/slicers/quizePageSlice";
import { getNextQuestionLink } from "../helper";
import { paths, QzPage } from "../routes/constants";
import { QuestionType } from "../types";
import {
  checkIfSingleInput,
  getFormItemClassNames,
  getQuestionOptions,
} from "./helpers";
import styles from "./SectionPage.module.scss";

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "Необходимо заполнить поле!",
};
/* eslint-enable no-template-curly-in-string */

type Props = {};

const SectionPage: FC<Props> = (props) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { quizeType, sectionNumber } = useParams() as any;
  const { currentBlock, blocks, answers, baseFields, sex } = useSelector(
    (state: TRootState) => state.quizePage
  );

  const onFinish = async (form: object) => {
    const currentAnswers = { ...answers, ...form };
    dispatch(setStateAnswers(currentAnswers));

    if (+sectionNumber === blocks.length) {
      const payload = {
        ...baseFields,
        sex,
        data: JSON.stringify(currentAnswers),
      };

      await dispatch(quizeThunks.registrateUser(payload));
      dispatch(quizeThunks.clearAnswers());

      history.push(paths[QzPage.COMPLETE]);
      return;
    }

    history.push(getNextQuestionLink(+sectionNumber, quizeType));
  };

  const onFinishFailed = (e) => {
    console.log(e);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentBlock]);

  return (
    <div className={styles["section-page"]}>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
      >
        <div className={styles["section-page__body"]}>
          {currentBlock.questions?.map((question, index) => (
            <React.Fragment key={index}>
              {question.type === QuestionType.INPUT && (
                <Form.Item
                  style={{
                    marginLeft: checkIfSingleInput(currentBlock, index)
                      ? "0px"
                      : undefined,
                  }}
                  className={getFormItemClassNames(question.type, styles)}
                  label={
                    <label className={styles["form-item__label"]}>
                      {question.description}
                    </label>
                  }
                  name={question.id}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input className={styles["form-item__input"]} />
                </Form.Item>
              )}
              {question.type === QuestionType.TEXT && (
                <Form.Item
                  className={getFormItemClassNames(question.type, styles)}
                  label={
                    <label className={styles["form-item__label"]}>
                      {question.description}
                    </label>
                  }
                  name={question.id}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea className={styles["form-item__text"]} />
                </Form.Item>
              )}
              {question.type === QuestionType.SINGLE_OPTION && (
                <Form.Item
                  className={getFormItemClassNames(question.type, styles)}
                  label={
                    <label className={styles["form-item__label"]}>
                      {question.description}
                    </label>
                  }
                  name={question.id}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Radio.Group>
                    {question.options &&
                      getQuestionOptions(question.options).map(
                        (option, optionIndex) => (
                          <Radio
                            key={`option-${index}-${optionIndex}`}
                            value={option}
                          >
                            {option}
                          </Radio>
                        )
                      )}
                  </Radio.Group>
                </Form.Item>
              )}
              {question.type === QuestionType.MULTIPLE_OPTION && (
                <Form.Item
                  className={getFormItemClassNames(question.type, styles)}
                  label={
                    <label className={styles["form-item__label"]}>
                      {question.description}
                    </label>
                  }
                  name={question.id}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Checkbox.Group style={{ width: "100%" }}>
                    {question.options &&
                      getQuestionOptions(question.options).map(
                        (option, optionIndex) => (
                          <Row key={`option-${index}-${optionIndex}`}>
                            <Col span={24}>
                              <Checkbox value={option}>{option}</Checkbox>
                            </Col>
                          </Row>
                        )
                      )}
                  </Checkbox.Group>
                </Form.Item>
              )}
            </React.Fragment>
          ))}
          <Button
            htmlType="submit"
            className={styles["section-page__submit-btn"]}
          >
            Продолжить
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default memo(SectionPage);
