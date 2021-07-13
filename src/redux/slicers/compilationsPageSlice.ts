import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { axiosInstance } from "components/pages/AdminPage/constants";
import { ICompilation } from "components/pages/StylistPage/CompilationsPage/types";
import { TypeDispatch } from "redux/ReduxStore";

const compilationsPageSlice = createSlice({
  name: "compilationsPageSlice",
  initialState: {
    compilations: [] as ICompilation[],
    compilation: {} as ICompilation,
  },
  reducers: {
    setCompilations: (state, action: PayloadAction<ICompilation[]>) => ({
      ...state,
      compilations: action.payload,
    }),
    setCompilation: (state, action: PayloadAction<ICompilation>) => ({
      ...state,
      compilation: action.payload,
    }),
  },
});

export const compilationsThunks = {
  getCompilations: () => async (dispatch: TypeDispatch) => {
    // const response = await axiosInstance.get("/api/compilations");
    const response = await axiosInstance.get("/mocks/getCompilations.json");
    dispatch(setCompilations(response?.data));
  },
  clearCompilations: () => (dispatch: TypeDispatch) => {
    dispatch(setCompilations([]));
  },
  getCompilation: (id: number) => async (dispatch: TypeDispatch) => {
    // const response = await axiosInstance.get(`/api/compilations/${id}`);
    // dispatch(setCompilation(response?.data));
  },
  clearCompilation: () => (dispatch: TypeDispatch) => {
    dispatch(setCompilation({} as ICompilation));
  },
};

export const { setCompilations, setCompilation } = compilationsPageSlice.actions;
export default compilationsPageSlice.reducer;
