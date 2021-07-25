import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuizeTypes } from "common/types/type";
import { TypeBlock } from "components/pages/AdminPage/BlocksPage/type";
import { axiosInstance } from "components/pages/AdminPage/constants";
import { TypeQuestion } from "components/pages/QuizePage/types";
import { TypeDispatch } from "redux/ReduxStore";

const quizePageSlice = createSlice({
  name: "quizePage",
  initialState: {
    answers: {} as Object | {},
    questions: [] as TypeQuestion[],
    blocks: [] as TypeBlock[],
    email: '' as string,
    name: '' as string,
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
    setBlocks: (state, action: PayloadAction<TypeBlock[]>) => ({
      ...state,
      blocks: action.payload,
    }),
    setEmail: (state, action: PayloadAction<string>) => ({
      ...state,
      email: action.payload,
    }),
    setName: (state, action: PayloadAction<string>) => ({
      ...state,
      name: action.payload,
    }),
  },
});

export const quizeThunks = {
  // getQuestions: (): TypeThunk => async (dispatch) => {
  //   const response = await axiosInstance.get('/api/questions');
  //   dispatch(actions.setQuestions(response?.data));
  // },
  getQuestionsByQuizeType: (quizeType: QuizeTypes) => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get(`/api/questions/byQuizeType/${quizeType}`);
    dispatch(setQuestions(response?.data));
  },
  getQuestionBlocks: () => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get(`/api/blocks`);
    dispatch(setBlocks(response?.data));
  },
  setEmail: (payload: string) => async (dispatch: TypeDispatch) => {
    dispatch(setEmail(payload));
  },
  setName: (payload: string) => async (dispatch: TypeDispatch) => {
    dispatch(setName(payload));
  },
  registrateUser: (payload: any) => async (dispatch: TypeDispatch) => {
    await axiosInstance.post('/api/auth/registrate', payload);
  },
};

export const { setStateAnswers, setQuestions, setEmail, setName, setBlocks } = quizePageSlice.actions;
export default quizePageSlice.reducer;
