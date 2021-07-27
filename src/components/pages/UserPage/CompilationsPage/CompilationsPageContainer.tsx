import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { TypeRootState, useAppDispatch } from "redux/ReduxStore";
import { compilationsThunks } from "redux/slicers/compilationsPageSlice";
import CompilationsPage from "./CompilationsPage";

const CompilationsPageContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { compilations, loading } = useSelector((state: TypeRootState) => ({
    compilations: state.compilationsPage.compilations,
    loading: state.compilationsPage.loading,
  }));
  useEffect(() => {
    dispatch(compilationsThunks.getUserCompilations());

    return () => {
      compilationsThunks.clearCompilations();
    };
  }, [dispatch]);

  return <CompilationsPage loading={loading} compilations={compilations} />;
};

export default memo(CompilationsPageContainer);
