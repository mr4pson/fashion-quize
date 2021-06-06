import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunks } from "redux/reducers/blocksPageReducer";
import { TypeAppState } from "redux/ReduxStore";
import BlocksPage from "./BlocksPage";

const BlocksPageContainer: React.FC = () => {
  const dispatch = useDispatch();
  const blocksState = useSelector((state: TypeAppState) => ({
    blocks: state.blocksPage.blocks,
  }));

  useEffect(() => {
    dispatch(thunks.getBlocks());
  }, [dispatch]);

  return <BlocksPage blocks={blocksState.blocks} />;
};

export default memo(BlocksPageContainer);
