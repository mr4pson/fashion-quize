import { QuizeTypes } from "common/types/type";
import { axiosInstance } from "components/pages/AdminPage/constants";
import { TypeQuestion } from "components/pages/QuizePage/types";
import { InferActionsType, InferThunksType } from "redux/ReduxStore";
import { SET_STATE_ANSWERS, SET_STATE_QUESTIONS } from "./actions";

type TypeInitialState = typeof initialState;
type TypeAction = InferActionsType<typeof actions>;
type TypeThunk = InferThunksType<TypeAction>;

const initialState = {
  answers: {} as Object | {},
  questions: [] as TypeQuestion[],
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
    case SET_STATE_QUESTIONS:
      return {
        ...state,
        questions: action.payload as TypeQuestion[],
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
  setQuestions: (questions: TypeQuestion[]) => ({
    type: SET_STATE_QUESTIONS,
    payload: questions,
  }),
};

export const thunks = {
  // getQuestions: (): TypeThunk => async (dispatch) => {
  //   const response = await axiosInstance.get('/api/questions');
  //   dispatch(actions.setQuestions(response?.data));
  // },
  getQuestionsByQuizeType: (quizeType: QuizeTypes): TypeThunk => async (dispatch) => {
    const response = await axiosInstance.get(`/api/questions/byQuizeType/${quizeType}`);
    dispatch(actions.setQuestions(response?.data));
  },
};

export default quizePageReducer;
