import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ETheme } from "common/types/types";
import { TypeDispatch } from "redux/ReduxStore";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: ETheme.LIGHT as ETheme,
  },
  reducers: {
    setTheme: (state, action: PayloadAction<ETheme>) => ({
      ...state,
      theme: action.payload,
    }),
  },
});

export const themeThunks = {
  setTheme: (theme: ETheme) => async (dispatch: TypeDispatch) => {
    dispatch(setTheme(theme));
  },
};

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
