import { openNotification } from "common/heplers/common-helpers";
import { axiosInstance } from "components/pages/AdminPage/constants";
import { TypeQuestion } from "components/pages/QuizePage/types";
import { InferActionsType, InferThunksType } from "redux/ReduxStore";
import { SET_STATE_QUESTION, SET_STATE_QUESTIONS } from "./actions";

type TypeInitialState = typeof initialState;
type TypeAction = InferActionsType<typeof actions>;
type TypeThunk = InferThunksType<TypeAction>;

const initialState = {
  questions: [] as TypeQuestion[],
  question: {} as TypeQuestion,
};

const questionsPageReducer = (
  state = initialState,
  action: TypeAction
): TypeInitialState => {
  switch (action.type) {
    case SET_STATE_QUESTIONS:
      return {
        ...state,
        questions: action.payload as TypeQuestion[],
      };
    case SET_STATE_QUESTION:
      return {
        ...state,
        question: action.payload as TypeQuestion,
      };
    default:
      return state;
  }
};

export const actions = {
  setQuestions: (questions: TypeQuestion[]) => ({
    type: SET_STATE_QUESTIONS,
    payload: questions,
  }),
  setQuestion: (question: TypeQuestion) => ({
    type: SET_STATE_QUESTION,
    payload: question,
  }),
  clearQuestion: () => ({
    type: SET_STATE_QUESTION,
    payload: {} as TypeQuestion,
  }),
};

export const thunks = {
  getQuestions: (): TypeThunk => async (dispatch) => {
    const response = await axiosInstance.get('/api/questions');
    dispatch(actions.setQuestions(response?.data));
  },
  getQuestion: (id: number): TypeThunk => async (dispatch) => {
    const response = await axiosInstance.get(`/api/questions/${id}`);
    try {
      dispatch(actions.setQuestion({
        ...response?.data,
        options: JSON.parse(response?.data.options),
      }));
    } catch (error) {
      openNotification('error', 'Не удалось загрузить варианты ответа. Получены данные в неправильном формате.');
    }
  },
  clearQuestion: (): TypeThunk => async (dispatch) => {
    dispatch(actions.clearQuestion());
  },
  removeQuestion: (id: number): TypeThunk => async (dispatch) => {
    await axiosInstance.delete(`/api/questions/${id}`);
    dispatch(thunks.getQuestions());
  },
};

export default questionsPageReducer;
