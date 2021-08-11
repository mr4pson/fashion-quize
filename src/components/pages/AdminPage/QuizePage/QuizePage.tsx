import { Descriptions } from "antd";
import { EQuize } from "common/types/types";
import Loader from "components/modules/Loader";
import { ESexes } from "components/pages/StylistPage/TasksPage/types";
import { FC, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { quizeThunks } from "redux/slicers/quizePageSlice";
import { AdmPage, paths } from "../routes/constants";
import styles from "./QuizePage.module.scss";
import { Link } from "react-router-dom";

const QuizePage: FC = () => {
  const { id } = useParams() as any;
  const dispatch = useAppDispatch();
  const { answers, questions, user } = useSelector(
    (state: TRootState) => state.quizePage
  );
  const questionsMap = questions.reduce((accum, question) => {
    accum[question.id] = question;
    return accum;
  }, {});

  useEffect(() => {
    dispatch(quizeThunks.getAnswers(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      const quizeType =
        user.sex === ESexes.MALE ? EQuize.FOR_MEN : EQuize.FOR_WOMEN;
      dispatch(quizeThunks.getQuestionsByQuizeType(quizeType));
    }
  }, [dispatch, user]);

  useEffect(() => {
    return () => {
      dispatch(quizeThunks.clearAnswers());
      dispatch(quizeThunks.clearUser());
    };
  }, [dispatch]);

  return (
    <div className={styles["detail"]}>
      {user.id && (
        <div className={styles["detail__header"]}>
          <h1>Анкета пользователя {user.name}</h1>
          <Link to={`${paths[AdmPage.USERS]}/${user.id}`}>
            Перейти к пользователю
          </Link>
        </div>
      )}
      {Object.keys(questionsMap).length && (
        <>
          <Descriptions size="default" column={2}>
            {Object.entries(answers).map(([key, value], index) => (
              <Descriptions.Item
                key={index}
                label={
                  <b>
                    {index + 1}. {questionsMap[key].description}
                  </b>
                }
              >
                {Array.isArray(value) ? value.join("; ") : value}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </>
      )}
      {(!questions.length || !Object.keys(answers).length) && <Loader />}
    </div>
  );
};

export default memo(QuizePage);
