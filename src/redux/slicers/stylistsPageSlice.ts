import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { openNotification } from "common/helpers/common-helpers";
import { axiosInstance } from "components/pages/AdminPage/constants";
import { TypeEditStylistDto } from "components/pages/AdminPage/StylistDetail/type";
import { TypeStylists } from "components/pages/AdminPage/StylistsPage/types";
import { TypeDispatch } from "redux/ReduxStore";

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
  createStylist: (payload: TypeEditStylistDto) => async (dispatch) => {
    const response = await axiosInstance.post("/api/stylists", payload);
    if (response.status === 201) {
      openNotification("success", `Email с паролем был отправлен стилисту на почту ${payload.login}`);
    } else {
      openNotification("error", `Не удалось создать стилиста`);
    }
  },
  updateStylist: (id: number, payload: TypeEditStylistDto) => async (dispatch) => {
    await axiosInstance.put(`/api/stylists/${id}`, payload);
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
