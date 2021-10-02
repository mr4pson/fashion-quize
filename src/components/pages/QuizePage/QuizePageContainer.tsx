import Header from "components/modules/Header";
import { FC } from "react";
import { useSelector } from "react-redux";

import { TRootState } from "redux/ReduxStore";
import QuizePage from "./QuizePage";

const QuizePageContainer: FC = () => {
  const quizeState = useSelector((state: TRootState) => state.quizePage);

  return (
    <>
      <Header />
      <QuizePage answers={quizeState.answers} />
    </>
  );
};

export default QuizePageContainer;
