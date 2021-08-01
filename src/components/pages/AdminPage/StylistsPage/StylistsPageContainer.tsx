import { Modal } from "antd";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TypeRootState } from "redux/ReduxStore";
import { stylistsThunks } from "redux/slicers/stylistsPageSlice";
import StylistsPage from "./StylistsPage";

const StylistsPageContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { stylists, loading } = useSelector((state: TypeRootState) => state.stylistsPage);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [stylistId, setStylistId] = useState<number | null>(null);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    setConfirmLoading(true);

    dispatch(stylistsThunks.removeStylist(stylistId!));

    setVisible(false);
    setConfirmLoading(false);
  };

  const onStylistsRemove = (id: number) => {
    setStylistId(id);
    showModal();
  };

  useEffect(() => {
    dispatch(stylistsThunks.getStylists());
    return () => {
      dispatch(stylistsThunks.clearStylists());
    }
  }, [dispatch]);

  return (
    <>
      <StylistsPage loading={loading} stylists={stylists} onStylistsRemove={onStylistsRemove} />
      <Modal
        title="Удаление стилиста"
        okText="Удалить"
        cancelText="Отменить"
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p>Вы точно хотите удалить стилиста №{stylistId}?</p>
      </Modal>
    </>
  );
};

export default memo(StylistsPageContainer);
