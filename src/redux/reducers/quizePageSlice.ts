import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuizeTypes } from "common/types/type";
import { axiosInstance } from "components/pages/AdminPage/constants";
import { TypeQuestion } from "components/pages/QuizePage/types";
import { TypeDispatch } from "redux/ReduxStore";

const quizePageSlice = createSlice({
  name: "quizePage",
  initialState: {
    answers: {} as Object | {},
    questions: [] as TypeQuestion[],
  },
  reducers: {
    setStateAnswers: (state, action: PayloadAction<Object | {}>) => ({
      ...state,
      answers: action.payload,
    }),
    setQuestions: (state, action: PayloadAction<TypeQuestion[]>) => ({
      ...state,
      questions: action.payload,
    }),
  },
});

export const thunks = {
  // getQuestions: (): TypeThunk => async (dispatch) => {
  //   const response = await axiosInstance.get('/api/questions');
  //   dispatch(actions.setQuestions(response?.data));
  // },
  getQuestionsByQuizeType: (quizeType: QuizeTypes) => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get(`/api/questions/byQuizeType/${quizeType}`);
    dispatch(setQuestions(response?.data));
  },
};

export const { setStateAnswers, setQuestions } = quizePageSlice.actions;
export default quizePageSlice.reducer;
