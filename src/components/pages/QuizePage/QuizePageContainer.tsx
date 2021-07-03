import { memo } from "react";
import { useSelector } from "react-redux";
import { TypeRootState } from "redux/ReduxStore";
import QuizePage from "./QuizePage";

const QuizePageContainer: React.FC = () => {
  const quizeState = useSelector((state: TypeRootState) => ({
    answers: state.quizePage.answers,
  }));

  return <QuizePage answers={quizeState.answers} />;
};

export default memo(QuizePageContainer);
