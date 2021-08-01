import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { axiosInstance } from "components/pages/AdminPage/constants";
import { TCompilation } from "components/pages/StylistPage/CompilationsPage/types";
import { TypeDispatch } from "redux/ReduxStore";

const compilationsPageSlice = createSlice({
  name: "compilationsPageSlice",
  initialState: {
    compilations: [] as TCompilation[],
    compilation: {} as TCompilation,
    loading: false as boolean,
  },
  reducers: {
    setCompilations: (state, action: PayloadAction<TCompilation[]>) => ({
      ...state,
      compilations: action.payload,
    }),
    setCompilation: (state, action: PayloadAction<TCompilation>) => ({
      ...state,
      compilation: action.payload,
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
    const response = await axiosInstance.get("/api/compilations");
    dispatch(setCompilations(response?.data));
    dispatch(setLoading(false));
  },
  getUserCompilations: () => async (dispatch: TypeDispatch) => {
    dispatch(setLoading(true));
    const response = await axiosInstance.get("/api/compilations/user-compilations");
    dispatch(setCompilations(response?.data));
    dispatch(setLoading(false));
  },
  setCompilation: (compilation: TCompilation) => (dispatch: TypeDispatch) => {
    dispatch(setCompilation(compilation));
  },
  clearCompilations: () => (dispatch: TypeDispatch) => {
    dispatch(setCompilations([]));
  },
  getCompilation: (id: number) => async (dispatch: TypeDispatch) => {
    dispatch(setLoading(true));
    const response = await axiosInstance.get(`/api/compilations/${id}`);
    dispatch(setCompilation(response?.data));
    dispatch(setLoading(false));
  },
  clearCompilation: () => (dispatch: TypeDispatch) => {
    dispatch(setCompilation({} as TCompilation));
  },
  createCompilation: (payload: any) => async () => {
    await axiosInstance.post(`/api/compilations`, payload);
  },
  updateCompilation: (id, payload: any) => async (dispatch: TypeDispatch) => {
    await axiosInstance.put(`/api/compilations/${id}`, payload);
    dispatch(setCompilation({} as TCompilation));
  },
};

export const { setCompilations, setCompilation, setLoading } = compilationsPageSlice.actions;
export default compilationsPageSlice.reducer;
