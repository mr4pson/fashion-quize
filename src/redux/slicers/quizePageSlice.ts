import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { EQuize } from "common/types/types";
import { TypeBlock } from "components/pages/AdminPage/BlocksPage/type";
import { axiosInstance } from "components/pages/AdminPage/consts";
import { TBaseFields } from "components/pages/QuizePage/BaseForm/types";
import { TypeQuestion } from "components/pages/QuizePage/types";
import { ESexes, TUser } from "components/pages/StylistPage/TasksPage/types";
import { TypeDispatch } from "redux/ReduxStore";

const quizePageSlice = createSlice({
  name: "quizePage",
  initialState: {
    answers: {} as Object | {},
    questions: [] as TypeQuestion[],
    blocks: [] as TypeBlock[],
    currentBlock: {} as TypeBlock,
    baseFields: {} as TBaseFields,
    sex: ESexes.FEMALE as ESexes,
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
    setCurrentBlock: (state, action: PayloadAction<TypeBlock>) => ({
      ...state,
      currentBlock: action.payload,
    }),
    setBaseFields: (state, action: PayloadAction<TBaseFields>) => ({
      ...state,
      baseFields: action.payload,
    }),
    setSex: (state, action: PayloadAction<ESexes>) => ({
      ...state,
      sex: action.payload,
    }),
    setUser: (state, action: PayloadAction<TUser>) => ({
      ...state,
      user: action.payload,
    }),
  },
});

export const quizeThunks = {
  getQuestionsByQuizeType: (quizeType: EQuize) => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get(`/questions/byQuizeType/${quizeType}`);
    dispatch(setQuestions(response?.data));
  },
  getQuestionBlocks: () => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get(`/blocks`);
    dispatch(setBlocks(response?.data));
  },
  getQuestionBlocksByQuizeType: (quizeType: EQuize) => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get(`/blocks/filterQuestionsByQuizeType/${quizeType}`);
    dispatch(setBlocks(response?.data));
  },
  getAnswers: (id: number) => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get(`/answers/${id}`);
    await dispatch(setStateAnswers(JSON.parse(response?.data.data)));
    dispatch(setUser(response?.data.user));
  },
  setBaseFields: (payload: TBaseFields) => async (dispatch: TypeDispatch) => {
    dispatch(setBaseFields(payload));
  },
  setCurrentBlock: (payload: TypeBlock) => async (dispatch: TypeDispatch) => {
    dispatch(setCurrentBlock(payload));
  },
  setSex: (payload: ESexes) => async (dispatch: TypeDispatch) => {
    dispatch(setSex(payload));
  },
  checkEmail: (payload: string) => async () => {
    return await axiosInstance.get(`/auth/check-email/${payload}`);
  },
  registrateUser: (payload: any) => async (dispatch: TypeDispatch) => {
    await axiosInstance.post("/auth/registrate", payload);
  },
  clearAnswers: () => (dispatch: TypeDispatch) => {
    dispatch(setStateAnswers({} as Object));
    dispatch(setBaseFields({} as TBaseFields));
    dispatch(setSex("" as ESexes));
  },
  clearUser: () => (dispatch: TypeDispatch) => {
    dispatch(setUser({} as TUser));
  },
};

export const { setStateAnswers, setQuestions, setBaseFields, setCurrentBlock, setBlocks, setSex, setUser } =
  quizePageSlice.actions;
export default quizePageSlice.reducer;
