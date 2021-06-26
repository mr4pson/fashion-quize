import { Modal } from "antd";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunks } from "redux/reducers/blocksPageSlice";
import { TypeRootState } from "redux/ReduxStore";
import BlocksPage from "./BlocksPage";

const BlocksPageContainer: React.FC = () => {
  const dispatch = useDispatch();
  const blocksState = useSelector((state: TypeRootState) => ({
    blocks: state.blocksPage.blocks,
  }));
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

    dispatch(thunks.removeBlock(blockId!));

    setVisible(false);
    setConfirmLoading(false);
  };

  const onBlockRemove = (id: number) => {
    setBlockId(id);
    showModal();
  };

  useEffect(() => {
    dispatch(thunks.getBlocks());
  }, [dispatch]);

  return (
    <>
      <BlocksPage blocks={blocksState.blocks} onBlockRemove={onBlockRemove} />
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

export default memo(BlocksPageContainer);
