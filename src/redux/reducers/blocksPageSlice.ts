import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeBlock } from "components/pages/AdminPage/BlocksPage/type";
import { axiosInstance } from "components/pages/AdminPage/constants";
import { TypeDispatch } from "redux/ReduxStore";

const blocksPageSlice = createSlice({
  name: "blocksPage",
  initialState: {
    blocks: [] as TypeBlock[],
    block: {} as TypeBlock,
  },
  reducers: {
    setBlocks: (state, action: PayloadAction<TypeBlock[]>) => ({
      ...state,
      blocks: action.payload,
    }),
    setBlock: (state, action: PayloadAction<TypeBlock>) => ({
      ...state,
      block: action.payload,
    }),
  },
});

export const blocksThunks = {
  getBlocks: () => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get("/api/blocks");
    dispatch(setBlocks(response?.data));
  },
  getBlock: (id: number) => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get(`/api/blocks/${id}`);
    dispatch(setBlock(response?.data));
  },
  clearBlock: () => (dispatch: TypeDispatch) => {
    dispatch(setBlock({} as TypeBlock));
  },
  removeBlock: (id: number) => async (dispatch: TypeDispatch) => {
    await axiosInstance.delete(`/api/blocks/${id}`);
    dispatch(blocksThunks.getBlocks());
  },
};

export const { setBlocks, setBlock } = blocksPageSlice.actions;
export default blocksPageSlice.reducer;
