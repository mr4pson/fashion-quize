import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { EQuize } from "common/types/types";
import { TypeBlock } from "components/pages/AdminPage/BlocksPage/type";
import { axiosInstance } from "components/pages/AdminPage/consts";
import { TypeQuestion } from "components/pages/QuizePage/types";
import { ESexes, TUser } from "components/pages/StylistPage/TasksPage/types";
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
    sex: "" as ESexes,
    user: {} as TUser,
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
    setSex: (state, action: PayloadAction<ESexes>) => ({
      ...state,
      sex: action.payload,
    }),
    setCity: (state, action: PayloadAction<string>) => ({
      ...state,
      city: action.payload,
    }),
    setUser: (state, action: PayloadAction<TUser>) => ({
      ...state,
      user: action.payload,
    })
  },
});

export const quizeThunks = {
  getQuestionsByQuizeType: (quizeType: EQuize) => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get(`/api/questions/byQuizeType/${quizeType}`);
    dispatch(setQuestions(response?.data));
  },
  getQuestionBlocks: () => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get(`/api/blocks`);
    dispatch(setBlocks(response?.data));
  },
  getAnswers: (id: number) => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get(`/api/answers/${id}`);
    await dispatch(setStateAnswers(JSON.parse(response?.data.data)));
    dispatch(setUser(response?.data.user));
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
  setSex: (payload: ESexes) => async (dispatch: TypeDispatch) => {
    dispatch(setSex(payload));
  },
  checkEmail: (payload: string) => async () => {
    return await axiosInstance.get(`/api/auth/check-email/${payload}`);
  },
  registrateUser: (payload: any) => async (dispatch: TypeDispatch) => {
    await axiosInstance.post("/api/auth/registrate", payload);
  },
  clearAnswers: () => (dispatch: TypeDispatch) => {
    dispatch(setStateAnswers({} as Object));
  },
  clearUser: () => (dispatch: TypeDispatch) => {
    dispatch(setUser({} as TUser));
  },
};

export const { setStateAnswers, setQuestions, setEmail, setName, setBlocks, setAge, setCity, setSex, setUser } = quizePageSlice.actions;
export default quizePageSlice.reducer;
