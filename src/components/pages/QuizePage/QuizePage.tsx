import { Button, Form, FormInstance } from "antd";
import classNames from "classnames";
import Question from "components/modules/Question/Question";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { quizeThunks, setStateAnswers } from "redux/reducers/quizePageSlice";
import { TypeRootState } from "redux/ReduxStore";
import { Page, paths } from "routes/constants";
import { getNextQuestionLink, getPrevQuestionLink } from "./helper";
import styles from "./QuizePage.module.scss";
import { TypeQuestion } from "./types";

type Props = {
  answers: Object | {};
};

const QuizePage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const state = useSelector((state: TypeRootState) => ({
    questions: state.quizePage.questions,
  }));
  const { questionNumber, quizeType } = useParams() as any;
  const questionsNumber = state.questions?.length;
  const [question, setQuestion] = useState<TypeQuestion>({} as TypeQuestion);
  const formRef = useRef<FormInstance>(null);
  const history = useHistory();

  console.log(question);

  useEffect(() => {
    formRef.current?.resetFields();
  });

  useEffect(() => {
    dispatch(quizeThunks.getQuestionsByQuizeType(quizeType));
  }, [dispatch, quizeType]);

  useEffect(() => {
    if (state.questions?.length) {
      setQuestion(state.questions[questionNumber]);
    }
  }, [dispatch, questionNumber, state.questions]);

  const onFinish = (values: any) => {
    const formValue = formRef.current?.getFieldsValue();
    const answers = { ...props.answers, [question.id]: formValue.answer };
    dispatch(setStateAnswers(answers));

    if (+questionNumber === questionsNumber - 1) {
      history.push(paths[Page.COMPLETE]);
      return;
    }

    history.push(getNextQuestionLink(+questionNumber, quizeType));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const initialValue = { answer: props.answers[question?.id] };

  return (
    <div className={styles["quize-page"]}>
      {/* <Header /> */}
      <Form name="basic" ref={formRef} initialValues={initialValue} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <div className="container">
          {+questionNumber !== -1 ? (
            <Question question={question} />
          ) : (
            <div className={styles["quize-page__no-questions"]}>Такого вопроса не существует.</div>
          )}
        </div>
        <div
          style={{ color: question?.block?.color }}
          className={classNames(styles["quize-page__sidebar"], styles["sidebar"])}
        >
          <div className={styles["sidebar__number"]}>
            <span>{questionNumber}</span>
          </div>
        </div>
        <div className={classNames(styles["quize-page__nav"], styles["navigation"])}>
          <div className={styles["container"]}>
            <div className={styles["navgation__prev-btn"]}>
              {questionNumber > 0 ? (
                <Link to={getPrevQuestionLink(questionNumber, quizeType)}>
                  <Button type="primary" danger className={styles["navgation__quize-btn"]}>
                    Назад
                  </Button>
                </Link>
              ) : (
                ""
              )}
            </div>
            <div className={styles["navgation__next-btn"]}>
              <Button htmlType="submit" type="primary" danger className={styles["navgation__quize-btn"]}>
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
