import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { openNotification } from "common/helpers/common-helpers";
import { QuizeTypes } from "common/types/type";
import { axiosInstance } from "components/pages/AdminPage/constants";
import { TypeQuestion } from "components/pages/QuizePage/types";
import { TypeDispatch } from "redux/ReduxStore";

const questionsPageSlice = createSlice({
  name: "questionsPage",
  initialState: {
    questions: [] as TypeQuestion[],
    question: {} as TypeQuestion,
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
  },
});

export const questionsThunks = {
  getQuestions: () => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get("/api/questions");
    dispatch(setQuestions(response?.data));
  },
  getQuestionsByQuizeType: (quizeType: QuizeTypes) => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get(`/api/questions/byQuizeType/${quizeType}`);
    dispatch(setQuestions(response?.data));
  },
  getQuestion: (id: number) => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get(`/api/questions/${id}`);
    try {
      dispatch(
        setQuestion({
          ...response?.data,
          options: JSON.parse(response?.data.options),
        })
      );
    } catch (error) {
      openNotification("error", "Не удалось загрузить варианты ответа. Получены данные в неправильном формате.");
    }
  },
  clearQuestion: () => async (dispatch: TypeDispatch) => {
    dispatch(setQuestion({} as TypeQuestion));
  },
  removeQuestion: (id: number, quizeType: QuizeTypes) => async (dispatch: TypeDispatch) => {
    await axiosInstance.delete(`/api/questions/${id}`);
    dispatch(questionsThunks.getQuestionsByQuizeType(quizeType));
  },
};

export const { setQuestions, setQuestion } = questionsPageSlice.actions;
export default questionsPageSlice.reducer;
