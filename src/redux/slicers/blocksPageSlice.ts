import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeBlock } from "components/pages/AdminPage/BlocksPage/type";
import { axiosInstance } from "components/pages/AdminPage/constants";
import { TypeDispatch } from "redux/ReduxStore";

const blocksPageSlice = createSlice({
  name: "blocksPage",
  initialState: {
    blocks: [] as TypeBlock[],
    block: {} as TypeBlock,
    loading: false,
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
    setLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loading: action.payload,
    }),
  },
});

export const blocksThunks = {
  getBlocks: () => async (dispatch: TypeDispatch) => {
    dispatch(setLoading(true));
    const response = await axiosInstance.get("/api/blocks");
    dispatch(setBlocks(response?.data));
    dispatch(setLoading(false));
  },
  getBlock: (id: number) => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get(`/api/blocks/${id}`);
    dispatch(setBlock(response?.data));
    dispatch(setLoading(false));
  },
  clearBlock: () => (dispatch: TypeDispatch) => {
    dispatch(setBlock({} as TypeBlock));
  },
  clearBlocks: () => (dispatch: TypeDispatch) => {
    dispatch(setBlocks([]));
  },
  removeBlock: (id: number) => async (dispatch: TypeDispatch) => {
    await axiosInstance.delete(`/api/blocks/${id}`);
    dispatch(blocksThunks.getBlocks());
  },
};

export const { setBlocks, setBlock, setLoading } = blocksPageSlice.actions;
export default blocksPageSlice.reducer;
