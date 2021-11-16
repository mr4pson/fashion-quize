import { FC } from "react";
import { useSelector } from "react-redux";

import { TRootState } from "redux/ReduxStore";
import CompletePage from "./CompletePage";

const CompletePageContainer: FC = () => {
  const { baseFields } = useSelector((state: TRootState) => state.quizePage);

  return (
    <>
      <CompletePage email={baseFields.email} name={baseFields.name} />
    </>
  );
};

export default CompletePageContainer;
