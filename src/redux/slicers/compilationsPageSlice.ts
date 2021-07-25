import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { axiosInstance } from "components/pages/AdminPage/constants";
import { TCompilation } from "components/pages/StylistPage/CompilationsPage/types";
import { TypeDispatch } from "redux/ReduxStore";

const compilationsPageSlice = createSlice({
  name: "compilationsPageSlice",
  initialState: {
    compilations: [] as TCompilation[],
    compilation: {} as TCompilation,
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
  },
});

export const compilationsThunks = {
  getCompilations: () => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get("/api/compilations");
    dispatch(setCompilations(response?.data));
  },
  clearCompilations: () => (dispatch: TypeDispatch) => {
    dispatch(setCompilations([]));
  },
  getCompilation: (id: number) => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get(`/api/compilations/${id}`);
    dispatch(setCompilation(response?.data));
  },
  clearCompilation: () => (dispatch: TypeDispatch) => {
    dispatch(setCompilation({} as TCompilation));
  },
  updateCompilation: (payload: any) => async () => {
    console.log("compilation updated", payload);
    // await
  },
};

export const { setCompilations, setCompilation } = compilationsPageSlice.actions;
export default compilationsPageSlice.reducer;
