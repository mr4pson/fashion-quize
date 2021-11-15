import Header from "components/modules/Header";
import { FC } from "react";
import { useSelector } from "react-redux";

import { TRootState } from "redux/ReduxStore";
import CompletePage from "./CompletePage";

const CompletePageContainer: FC = () => {
  // const { email, name } = useSelector((state: TRootState) => state.quizePage);
  const { email, name } = { email: "", name: "" };

  return (
    <>
      <Header />
      <CompletePage email={email} name={name} />
    </>
  );
};

export default CompletePageContainer;
