import { FC } from "react";
import { useSelector } from "react-redux";

import { TRootState } from "redux/ReduxStore";
import QuizePage from "./QuizePage";

const QuizePageContainer: FC = () => {
  const quizeState = useSelector((state: TRootState) => state.quizePage);

  return <QuizePage answers={quizeState.answers} />;
};

export default QuizePageContainer;
