import { FC, useEffect } from "react";
import { useSelector } from "react-redux";

import { TypeRootState, useAppDispatch } from "redux/ReduxStore";
import { compilationsThunks } from "redux/slicers/compilationsPageSlice";
import CompilationsPage from "./CompilationsPage";

const CompilationsPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const compilations = useSelector((state: TypeRootState) => state.compilationsPage.compilations);

  useEffect(() => {
    dispatch(compilationsThunks.getCompilations());

    return () => dispatch(compilationsThunks.clearCompilations());
  }, [dispatch]);

  return <CompilationsPage compilations={compilations} />;
};

export default CompilationsPageContainer;
