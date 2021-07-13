import { useEffect } from "react";
import { useSelector } from "react-redux";

import { TypeRootState, useAppDispatch } from "redux/ReduxStore";
import { compilationsThunks } from "redux/slicers/compilationsPageSlice";
import CompilationPage from "./CompilationsPage";

const CompilationsPageContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const compilationsState = useSelector((state: TypeRootState) => ({
    compilations: state.compilationsPage.compilations,
  }));

  // const [visible, setVisible] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const [stylistId, setStylistId] = useState<number | null>(null);

  // const showModal = () => {
  //   setVisible(true);
  // };

  // const handleCancel = () => {
  //   setVisible(false);
  // };

  // const handleDelete = () => {
  //   setConfirmLoading(true);

  //   dispatch(stylistsThunks.removeStylist(stylistId!));

  //   setVisible(false);
  //   setConfirmLoading(false);
  // };

  // const onStylistsRemove = (id: number) => {
  //   setStylistId(id);
  //   showModal();
  // };

  useEffect(() => {
    dispatch(compilationsThunks.getCompilations());

    return () => {
      compilationsThunks.clearCompilations();
    };
  }, [dispatch]);

  return <CompilationPage compilations={compilationsState.compilations} />;
};

export default CompilationsPageContainer;
