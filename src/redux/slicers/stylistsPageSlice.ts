import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeStylists } from "components/pages/AdminPage/StylistsPage/types";
import { TypeDispatch } from "redux/ReduxStore";
import { axiosInstance } from "components/pages/AdminPage/constants";

const stylistsPageSlice = createSlice({
  name: "stylistsPage",
  initialState: {
    stylists: [] as TypeStylists[],
    stylist: {} as TypeStylists,
  },
  reducers: {
    setStylists: (state, action: PayloadAction<TypeStylists[]>) => ({
      ...state,
      stylists: action.payload,
    }),
    setStylist: (state, action: PayloadAction<TypeStylists>) => ({
      ...state,
      stylist: action.payload,
    }),
  },
});

export const stylistsThunks = {
  getStylists: () => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get("/api/stylists");
    dispatch(setStylists(response?.data));
  },
  getStylist: (id: number) => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get(`/api/stylists/${id}`);
    dispatch(setStylist(response?.data));
  },
  clearStylist: () => (dispatch: TypeDispatch) => {
    dispatch(setStylist({} as TypeStylists));
  },
  removeStylist: (id: number) => async (dispatch: TypeDispatch) => {
    await axiosInstance.delete(`/api/stylists/${id}`);
    dispatch(stylistsThunks.getStylists());
  },
};

export const { setStylists, setStylist } = stylistsPageSlice.actions;
export default stylistsPageSlice.reducer;
