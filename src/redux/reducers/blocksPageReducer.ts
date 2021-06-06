import axios from "axios";
import { TypeBlocks } from "components/pages/AdminPage/BlocksPage/type";
import { InferActionsType, InferThunksType } from "redux/ReduxStore";
import { SET_STATE_BLOCKS } from "./actions";

type TypeInitialState = typeof initialState;
type TypeAction = InferActionsType<typeof actions>;
type TypeThunk = InferThunksType<TypeAction>;

const initialState = {
  blocks: [] as TypeBlocks[],
};

const blocksPageReducer = (
  state = initialState,
  action: TypeAction
): TypeInitialState => {
  switch (action.type) {
    case SET_STATE_BLOCKS:
      return {
        ...state,
        blocks: action.payload,
      };
    default:
      return state;
  }
};

export const actions = {
  setBlocks: (blocks: TypeBlocks[]) => ({
    type: SET_STATE_BLOCKS,
    payload: blocks,
  }),
};

export const thunks = {
  getBlocks: (): TypeThunk => async (dispatch) => {
    const response = await axios.get("/mocks/getBlocks.json");
    dispatch(actions.setBlocks(response.data));
  },
};

export default blocksPageReducer;
