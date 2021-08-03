import { FC, useEffect } from "react";
import { useSelector } from "react-redux";

import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { compilationsThunks } from "redux/slicers/compilationsPageSlice";
import CompilationsPage from "./CompilationsPage";

const CompilationsPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const { compilations, loading } = useSelector((state: TRootState) => state.compilationsPage);

  useEffect(() => {
    dispatch(compilationsThunks.getCompilations());

    return () => dispatch(compilationsThunks.clearCompilations());
  }, [dispatch]);

  return <CompilationsPage compilations={compilations} loading={loading} />;
};

export default CompilationsPageContainer;
