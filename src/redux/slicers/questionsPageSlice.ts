import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { openNotification } from "common/helpers/common-helpers";
import { EQuize } from "common/types/types";
import { axiosInstance } from "components/pages/AdminPage/consts";
import { TypeQuestion } from "components/pages/QuizePage/types";
import { TypeDispatch } from "redux/ReduxStore";

const questionsPageSlice = createSlice({
  name: "questionsPage",
  initialState: {
    questions: [] as TypeQuestion[],
    question: {} as TypeQuestion,
    loading: false,
  },
  reducers: {
    setQuestions: (state, action: PayloadAction<TypeQuestion[]>) => ({
      ...state,
      questions: action.payload,
    }),
    setQuestion: (state, action: PayloadAction<TypeQuestion>) => ({
      ...state,
      question: action.payload,
    }),
    setLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loading: action.payload,
    }),
  },
});

export const questionsThunks = {
  getQuestions: () => async (dispatch: TypeDispatch) => {
    dispatch(setLoading(true));
    const response = await axiosInstance.get("/questions");
    dispatch(setQuestions(response?.data));
    dispatch(setLoading(false));
  },
  getQuestionsByQuizeType: (quizeType: EQuize) => async (dispatch: TypeDispatch) => {
    dispatch(setLoading(true));
    const response = await axiosInstance.get(`/questions/byQuizeType/${quizeType}`);
    dispatch(setQuestions(response?.data));
    dispatch(setLoading(false));
  },
  getQuestion: (id: number) => async (dispatch: TypeDispatch) => {
    dispatch(setLoading(true));
    const response = await axiosInstance.get(`/questions/${id}`);
    dispatch(setLoading(false));
    try {
      dispatch(
        setQuestion({
          ...response?.data,
          options: response?.data.options ? JSON.parse(response?.data.options) : [],
        })
      );
    } catch (error) {
      openNotification("error", "Не удалось загрузить варианты ответов. Получены данные имеют неверный формат.");
    }
  },
  clearQuestion: () => async (dispatch: TypeDispatch) => {
    dispatch(setQuestion({} as TypeQuestion));
  },
  clearQuestions: () => async (dispatch: TypeDispatch) => {
    dispatch(setQuestions([]));
  },
  removeQuestion: (id: number, quizeType: EQuize) => async (dispatch: TypeDispatch) => {
    await axiosInstance.delete(`/questions/${id}`);
    dispatch(questionsThunks.getQuestionsByQuizeType(quizeType));
  },
};

export const { setQuestions, setQuestion, setLoading } = questionsPageSlice.actions;
export default questionsPageSlice.reducer;
