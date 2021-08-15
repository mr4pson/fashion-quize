import { TCompilation } from "components/pages/StylistPage/CompilationsPage/types";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { compilationsThunks } from "redux/slicers/compilationsPageSlice";
import CompilationsPage from "./CompilationsPage";
import { initialSelectedLooks } from "./constants";

const CompilationsPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const { compilations, loading } = useSelector(
    (state: TRootState) => state.compilationsPage
  );
  const [visible, setVisible] = useState(false);
  const [selectedLooks, setSelectedLooks] = useState(initialSelectedLooks);
  const [currentCompilation, setCurrentCompilation] = useState<TCompilation>();

  useEffect(() => {
    dispatch(compilationsThunks.getUserCompilations());

    return () => {
      compilationsThunks.clearCompilations();
    };
  }, [dispatch]);

  return (
    <CompilationsPage
      visible={visible}
      setVisible={setVisible}
      selectedLooks={selectedLooks}
      setSelectedLooks={setSelectedLooks}
      currentCompilation={currentCompilation}
      setCurrentCompilation={setCurrentCompilation}
      loading={loading}
      compilations={compilations}
    />
  );
};

export default CompilationsPageContainer;
