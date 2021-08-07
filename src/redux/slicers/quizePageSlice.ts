import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { EQuize } from "common/types/types";
import { TypeBlock } from "components/pages/AdminPage/BlocksPage/type";
import { axiosInstance } from "components/pages/AdminPage/consts";
import { TypeQuestion } from "components/pages/QuizePage/types";
import { TypeDispatch } from "redux/ReduxStore";

const quizePageSlice = createSlice({
  name: "quizePage",
  initialState: {
    answers: {} as Object | {},
    questions: [] as TypeQuestion[],
    blocks: [] as TypeBlock[],
    name: "" as string,
    email: "" as string,
    age: 0 as number,
    city: "" as string,
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
    setName: (state, action: PayloadAction<string>) => ({
      ...state,
      name: action.payload,
    }),
    setEmail: (state, action: PayloadAction<string>) => ({
      ...state,
      email: action.payload,
    }),
    setAge: (state, action: PayloadAction<number>) => ({
      ...state,
      age: action.payload,
    }),
    setCity: (state, action: PayloadAction<string>) => ({
      ...state,
      city: action.payload,
    }),
  },
});

export const quizeThunks = {
  // getQuestions: (): TypeThunk => async (dispatch) => {
  //   const response = await axiosInstance.get('/api/questions');
  //   dispatch(actions.setQuestions(response?.data));
  // },
  getQuestionsByQuizeType: (quizeType: EQuize) => async (dispatch: TypeDispatch) => {
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
  setAge: (payload: number) => async (dispatch: TypeDispatch) => {
    dispatch(setAge(payload));
  },
  setCity: (payload: string) => async (dispatch: TypeDispatch) => {
    dispatch(setCity(payload));
  },
  checkEmail: (payload: string) => async () => {
    return await axiosInstance.get(`/api/auth/check-email/${payload}`);
  },
  registrateUser: (payload: any) => async (dispatch: TypeDispatch) => {
    await axiosInstance.post("/api/auth/registrate", payload);
  },
};

export const { setStateAnswers, setQuestions, setEmail, setName, setBlocks, setAge, setCity } = quizePageSlice.actions;
export default quizePageSlice.reducer;
