import { InferActionsType } from "redux/ReduxStore";
import { SET_STATE_ANSWERS } from "./actions";

type TypeInitialState = typeof initialState;
type TypeAction = InferActionsType<typeof actions>;
// type TypeThunk = InferThunksType<TypeAction>;

const initialState = {
  answers: {} as Object | {},
};

const quizePageReducer = (
  state = initialState,
  action: TypeAction
): TypeInitialState => {
  switch (action.type) {
    case SET_STATE_ANSWERS:
      return {
        ...state,
        answers: action.payload,
      };
    default:
      return state;
  }
};

export const actions = {
  setStateAnswers: (answers: Object | {}) => ({
    type: SET_STATE_ANSWERS,
    payload: answers,
  }),
};

export default quizePageReducer;
