import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { axiosInstance } from "components/pages/AdminPage/consts";
import { TCompilation } from "components/pages/StylistPage/CompilationsPage/types";
import { TypeDispatch } from "redux/ReduxStore";

const itemsNumber = 3;

const compilationsPageSlice = createSlice({
  name: "compilationsPage",
  initialState: {
    compilations: [] as TCompilation[],
    visibleCompilations: [] as TCompilation[],
    isIncreasePageBtnVisible: false,
    page: 0,
    compilation: {} as TCompilation,
    activeCompilation: {} as TCompilation,
    activeLookIndex: -1,
    loading: false as boolean,
  },
  reducers: {
    setCompilations: (state, action: PayloadAction<TCompilation[]>) => ({
      ...state,
      compilations: action.payload,
    }),
    increasePageNumber: (state) => {
      const currentPage = state.page + 1;
      const visibleCompilations = state.compilations?.slice(0, currentPage * itemsNumber);
      const isIncreasePageBtnVisible = visibleCompilations?.length < state.compilations?.length;
      return {
        ...state,
        page: currentPage,
        visibleCompilations,
        isIncreasePageBtnVisible,
      }
    },
    resetPageNumber: (state) => ({
      ...state,
      visibleCompilations: [],
      page: 0,
      isIncreasePageBtnVisible: false,
    }),
    setCompilation: (state, action: PayloadAction<TCompilation>) => ({
      ...state,
      compilation: action.payload,
    }),
    setActiveCompilation: (state, action: PayloadAction<TCompilation>) => ({
      ...state,
      activeCompilation: action.payload,
    }),
    setActiveLookIndex: (state, action: PayloadAction<number>) => ({
      ...state,
      activeLookIndex: action.payload,
    }),
    setLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loading: action.payload,
    }),
  },
});

export const compilationsThunks = {
  getCompilations: () => async (dispatch: TypeDispatch) => {
    dispatch(setLoading(true));
    const response = await axiosInstance.get("/compilations");
    dispatch(setCompilations(response?.data));
    dispatch(setLoading(false));
  },
  getUserCompilations: () => async (dispatch: TypeDispatch) => {
    dispatch(setLoading(true));
    const response = await axiosInstance.get("/compilations/user-compilations");
    await dispatch(setCompilations(response?.data));
    dispatch(increasePageNumber());
    dispatch(setLoading(false));
  },
  getStylistCompilations: () => async (dispatch: TypeDispatch) => {
    dispatch(setLoading(true));
    const response = await axiosInstance.get("/compilations/stylist-compilations");
    dispatch(setCompilations(response?.data));
    dispatch(setLoading(false));
  },
  increaseCompilationPage: () => async (dispatch: TypeDispatch) => {
    dispatch(increasePageNumber());
  },
  resetPageNumber: () => async (dispatch: TypeDispatch) => {
    dispatch(resetPageNumber());
  },
  setCompilation: (compilation: TCompilation) => (dispatch: TypeDispatch) => {
    dispatch(setCompilation(compilation));
  },
  setActiveCompilationAndLookIndex: (compilation: TCompilation, lookIndex: number) => (dispatch: TypeDispatch) => {
    dispatch(setActiveLookIndex(lookIndex));
    dispatch(setActiveCompilation(compilation));
  },
  clearActiveCompilation: () => (dispatch: TypeDispatch) => {
    dispatch(setActiveCompilation({} as TCompilation));
  },
  clearCompilations: () => (dispatch: TypeDispatch) => {
    dispatch(setCompilations([]));
  },
  getCompilation: (id: number) => async (dispatch: TypeDispatch) => {
    dispatch(setLoading(true));
    const response = await axiosInstance.get(`/compilations/${id}`);
    dispatch(setCompilation(response?.data));
    dispatch(setLoading(false));
  },
  clearCompilation: () => (dispatch: TypeDispatch) => {
    dispatch(setCompilation({} as TCompilation));
  },
  createCompilation: (payload: any) => async () => {
    await axiosInstance.post(`/compilations`, payload);
  },
  updateCompilation: (id, payload: any) => async (dispatch: TypeDispatch) => {
    await axiosInstance.put(`/compilations/${id}`, payload);
    dispatch(setCompilation({} as TCompilation));
  },
  rateCompilation: (payload: any) => async () => {
    await axiosInstance.post(`/compilations/rate`, payload);
  },
};

export const { setCompilations, setCompilation, setLoading, increasePageNumber, resetPageNumber, setActiveCompilation, setActiveLookIndex } = compilationsPageSlice.actions;
export default compilationsPageSlice.reducer;
