import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { quizeThunks } from "redux/slicers/quizePageSlice";

import CompletePage from "./CompletePage";

const CompletePageContainer: FC = () => {
  const { baseFields } = useSelector((state: TRootState) => state.quizePage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(quizeThunks.clearAnswers());
    };
  }, [dispatch]);

  return (
    <>
      <CompletePage email={baseFields.email} name={baseFields.name} />
    </>
  );
};

export default CompletePageContainer;
