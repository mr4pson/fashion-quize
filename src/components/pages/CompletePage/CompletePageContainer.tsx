import { memo } from "react";
import { useSelector } from "react-redux";
import { TypeRootState } from "redux/ReduxStore";
import CompletePage from "./CompletePage";

const CompletePageContainer: React.FC = () => {
  const { email, name } = useSelector((state: TypeRootState) => ({
    email: state.quizePage.email,
    name: state.quizePage.name,
  }));

  return <CompletePage email={email} name={name} />;
};

export default memo(CompletePageContainer);
