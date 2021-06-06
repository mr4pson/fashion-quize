import { memo } from "react";
import { useSelector } from "react-redux";
import { TypeAppState } from "redux/ReduxStore";
import QuizePage from "./QuizePage";

const QuizePageContainer: React.FC = () => {
  const quizeState = useSelector((state: TypeAppState) => ({
    answers: state.quizePage.answers,
  }));

  return <QuizePage answers={quizeState.answers} />;
};

export default memo(QuizePageContainer);
