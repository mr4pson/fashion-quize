import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TypeRootState } from "redux/ReduxStore";
import CompletePage from "./CompletePage";

const CompletePageContainer: React.FC = () => {
  const dispatch = useDispatch();
  const quizeState = useSelector((state: TypeRootState) => ({
    answers: state.quizePage.answers,
  }));

  useEffect(() => {
    const payload = {
      name: quizeState.answers[1],
      email: quizeState.answers[4],
      data: JSON.stringify(quizeState.answers),
    };
    console.log(payload);

    // axios.post("/api/answers", payload);
    // dispatch(actions.setStateAnswers({}));
  }, [dispatch, quizeState.answers]);
  return <CompletePage answers={quizeState.answers} />;
};

export default memo(CompletePageContainer);
