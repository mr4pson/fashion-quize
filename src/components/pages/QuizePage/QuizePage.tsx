import { Button, Form, FormInstance } from "antd";
import classNames from "classnames";
import Question from "components/modules/Question/Question";
import { memo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { actions } from "redux/reducers/quizePageReducer";
import { Page, paths } from "routes/constants";
import { questions } from "./constants";
import { getNextQuestionLink, getPrevQuestionLink } from "./helper";
import styles from "./QuizePage.module.scss";

type Props = {
  answers: Object | {};
};

const QuizePage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const { questionNumber } = useParams() as any;
  const questionsNumber = questions.length;
  const questionIndex = questions.findIndex(
    (question) => question.id === +questionNumber
  );
  const question = questions[questionIndex];
  const formRef = useRef<FormInstance>(null);
  const history = useHistory();

  useEffect(() => {
    formRef.current?.resetFields();
  });

  const onFinish = (values: any) => {
    const formValue = formRef.current?.getFieldsValue();
    const answers = { ...props.answers, [question.id]: formValue.answer };
    dispatch(actions.setStateAnswers(answers));

    if (+questionNumber === questionsNumber) {
      history.push(paths[Page.COMPLETE]);
      return;
    }

    history.push(getNextQuestionLink(questionNumber));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const initialValue = { answer: props.answers[question?.id] };

  return (
    <div className={styles["quize-page"]}>
      {/* <Header /> */}
      <Form
        name="basic"
        ref={formRef}
        initialValues={initialValue}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="container">
          {questionIndex !== -1 ? (
            <Question question={question} />
          ) : (
            <div className={styles["quize-page__no-questions"]}>
              Такого вопроса не существует.
            </div>
          )}
        </div>
        <div
          style={{ color: question.block.sidebarColor }}
          className={classNames(
            styles["quize-page__sidebar"],
            styles["sidebar"]
          )}
        >
          <div className={styles["sidebar__number"]}>
            <span>{questionNumber}</span>
          </div>
        </div>
        <div
          className={classNames(
            styles["quize-page__nav"],
            styles["navigation"]
          )}
        >
          <div className={styles["container"]}>
            <div className={styles["navgation__prev-btn"]}>
              {questionNumber > 1 ? (
                <Link to={getPrevQuestionLink(questionNumber)}>
                  <Button
                    type="primary"
                    danger
                    className={styles["navgation__quize-btn"]}
                  >
                    Назад
                  </Button>
                </Link>
              ) : (
                ""
              )}
            </div>
            <div className={styles["navgation__next-btn"]}>
              <Button
                htmlType="submit"
                type="primary"
                danger
                className={styles["navgation__quize-btn"]}
              >
                {questionNumber < questionsNumber ? "Далее" : "Сдать"}
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default memo(QuizePage);
