import { RightOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance } from "antd";
import classNames from "classnames";
import Question from "components/modules/Question/Question";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { TypeRootState } from "redux/ReduxStore";
import { quizeThunks, setStateAnswers } from "redux/slicers/quizePageSlice";
import { Page, paths } from "routes/constants";
import { getNextQuestionLink } from "./helper";
import styles from "./QuizePage.module.scss";
import { TypeQuestion } from "./types";

type Props = {
  answers: Object | {};
};

const QuizePage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const { questions, blocks, name, email, age, city } = useSelector(
    (state: TypeRootState) => ({
      questions: state.quizePage.questions,
      blocks: state.quizePage.blocks,
      name: state.quizePage.name,
      email: state.quizePage.email,
      age: state.quizePage.age,
      city: state.quizePage.city,
    })
  );
  const { questionNumber, quizeType } = useParams() as any;
  const questionsNumber = questions?.length;
  const [question, setQuestion] = useState<TypeQuestion>({} as TypeQuestion);
  const formRef = useRef<FormInstance>(null);
  const history = useHistory();

  useEffect(() => {
    formRef.current?.resetFields();
  });

  useEffect(() => {
    dispatch(quizeThunks.getQuestionsByQuizeType(quizeType));
    dispatch(quizeThunks.getQuestionBlocks());
  }, [dispatch, quizeType]);

  useEffect(() => {
    if (questions?.length) {
      setQuestion(questions[questionNumber - 1]);
    }
  }, [dispatch, questionNumber, questions]);

  const onFinish = async () => {
    const formValue = formRef.current?.getFieldsValue();
    const answers = { ...props.answers, [question.id]: formValue.answer };
    dispatch(setStateAnswers(answers));

    if (+questionNumber === questionsNumber) {
      const payload = {
        name,
        email,
        age,
        city,
        data: JSON.stringify(answers),
      };
      await dispatch(quizeThunks.registrateUser(payload));
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
    <div className={classNames(styles["quize-page"], "quize-page")}>
      {/* <Header /> */}
      <Form
        name="basic"
        ref={formRef}
        initialValues={initialValue}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="container">
          {+questionNumber !== -1 ? (
            <Question question={question} />
          ) : (
            <div className={styles["quize-page__no-questions"]}>
              Такого вопроса не существует.
            </div>
          )}
        </div>
        <div
          style={{ color: question?.block?.color }}
          className={classNames(
            styles["quize-page__sidebar"],
            styles["sidebar"]
          )}
        >
          {/* <div className={styles["sidebar__number"]}>
            <span>{questionNumber}</span>
          </div> */}
          <div className={styles["progress"]}>
            {blocks.map((block) => (
              <div key={block.id} className={styles["progress__item"]}></div>
            ))}
          </div>
        </div>
        <Button htmlType="submit" className={styles["next-button"]}>
          <RightOutlined />
        </Button>
        {/* <div
          className={classNames(
            styles["quize-page__nav"],
            styles["navigation"]
          )}
        >
          <div className={styles["container"]}> */}
        {/* <div className={styles["navgation__prev-btn"]}>
              {questionNumber > 1 ? (
                <Link to={getPrevQuestionLink(questionNumber, quizeType)}>
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
            </div> */}

        {/* <div className={styles["navgation__next-btn"]}>
              <Button
                htmlType="submit"
                type="primary"
                danger
                className={styles["navgation__quize-btn"]}
              >
                {questionNumber < questionsNumber ? "Далее" : "Сдать"}
              </Button>
            </div> */}
        {/* </div>
        </div> */}
      </Form>
    </div>
  );
};

export default memo(QuizePage);
