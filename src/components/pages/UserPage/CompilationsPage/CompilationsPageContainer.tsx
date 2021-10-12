import { TCompilation } from "components/pages/StylistPage/CompilationsPage/types";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { compilationsThunks } from "redux/slicers/compilationsPageSlice";
import CompilationsPage from "./CompilationsPage";
import { initialSelectedLooks } from "./constants";

const CompilationsPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const { isIncreasePageBtnVisible, visibleCompilations, loading } = useSelector(
    (state: TRootState) => state.compilationsPage
  );
  const [visible, setVisible] = useState(false);
  const [selectedLooks, setSelectedLooks] = useState(initialSelectedLooks);
  const [currentCompilation, setCurrentCompilation] = useState<TCompilation>();
  
  const handleIncreaseCompilationPage = (): void => {
    dispatch(compilationsThunks.increaseCompilationPage());
  }

  useEffect(() => {
    dispatch(compilationsThunks.getUserCompilations());

    return () => {
      dispatch(compilationsThunks.clearCompilations());
      dispatch(compilationsThunks.resetPageNumber());
    };
  }, [dispatch]);

  return (
    <CompilationsPage
      visible={visible}
      selectedLooks={selectedLooks}
      currentCompilation={currentCompilation}
      loading={loading}
      compilations={visibleCompilations}
      isIncreasePageBtnVisible={isIncreasePageBtnVisible}
      setVisible={setVisible}
      setSelectedLooks={setSelectedLooks}
      increaseCompilationPage={handleIncreaseCompilationPage}
      setCurrentCompilation={setCurrentCompilation}
    />
  );
};

export default CompilationsPageContainer;
