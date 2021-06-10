import { TypeBlock } from "components/pages/AdminPage/BlocksPage/type";
import { axiosInstance } from "components/pages/AdminPage/constants";
import { InferActionsType, InferThunksType } from "redux/ReduxStore";
import { SET_STATE_BLOCK, SET_STATE_BLOCKS } from "./actions";

type TypeInitialState = typeof initialState;
type TypeAction = InferActionsType<typeof actions>;
type TypeThunk = InferThunksType<TypeAction>;

const initialState = {
  blocks: [] as TypeBlock[],
  block: {} as TypeBlock,
};

const blocksPageReducer = (
  state = initialState,
  action: TypeAction
): TypeInitialState => {
  switch (action.type) {
    case SET_STATE_BLOCKS:
      return {
        ...state,
        blocks: action.payload as TypeBlock[],
      };
    case SET_STATE_BLOCK:
      return {
        ...state,
        block: action.payload as TypeBlock,
      };
    default:
      return state;
  }
};

export const actions = {
  setBlocks: (blocks: TypeBlock[]) => ({
    type: SET_STATE_BLOCKS,
    payload: blocks,
  }),
  setBlock: (block: TypeBlock) => ({
    type: SET_STATE_BLOCK,
    payload: block,
  }),
  clearBlock: () => ({
    type: SET_STATE_BLOCK,
    payload: {} as TypeBlock,
  }),
};

export const thunks = {
  getBlocks: (): TypeThunk => async (dispatch) => {
    const response = await axiosInstance.get('/api/blocks');
    dispatch(actions.setBlocks(response?.data));
  },
  getBlock: (id: number): TypeThunk => async (dispatch) => {
    const response = await axiosInstance.get(`/api/blocks/${id}`);
    dispatch(actions.setBlock(response?.data));
  },
  clearBlock: (): TypeThunk => async (dispatch) => {
    dispatch(actions.clearBlock());
  },
  removeBlock: (id: number): TypeThunk => async (dispatch) => {
    await axiosInstance.delete(`/api/blocks/${id}`);
    dispatch(thunks.getBlocks());
  },
};

export default blocksPageReducer;
