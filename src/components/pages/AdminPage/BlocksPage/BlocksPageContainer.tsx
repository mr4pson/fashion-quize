import { Modal } from "antd";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { blocksThunks } from "redux/slicers/blocksPageSlice";
import BlocksPage from "./BlocksPage";

const BlocksPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const { blocks, loading } = useSelector((state: TRootState) => state.blocksPage);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [blockId, setBlockId] = useState<number | null>(null);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = async () => {
    setConfirmLoading(true);

    dispatch(blocksThunks.removeBlock(blockId!));

    setVisible(false);
    setConfirmLoading(false);
  };

  const onBlockRemove = (id: number) => {
    setBlockId(id);
    showModal();
  };

  useEffect(() => {
    dispatch(blocksThunks.getBlocks());

    return () => {
      dispatch(blocksThunks.clearBlocks());
    };
  }, [dispatch]);

  return (
    <>
      <BlocksPage blocks={blocks} loading={loading} onBlockRemove={onBlockRemove} />
      <Modal
        title="Удаление блока"
        visible={visible}
        okText="Удалить"
        cancelText="Отменить"
        onOk={handleDelete}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Вы точно хотите удалить блок №{blockId}?</p>
      </Modal>
    </>
  );
};

export default BlocksPageContainer;
