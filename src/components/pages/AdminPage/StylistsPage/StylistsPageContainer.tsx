import { Modal } from "antd";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { stylistsThunks } from "redux/slicers/stylistsPageSlice";
import StylistsPage from "./StylistsPage";

const StylistsPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const { stylists, loading } = useSelector((state: TRootState) => state.stylistsPage);

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
    };
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

export default StylistsPageContainer;
