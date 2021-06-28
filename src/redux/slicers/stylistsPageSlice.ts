import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeStylists } from "components/pages/AdminPage/StylistsPage/types";
import { TypeDispatch } from "redux/ReduxStore";

const stylistsPageSlice = createSlice({
  name: "stylistsPage",
  initialState: {
    stylists: [
      {
        id: "1",
        fullName: "Иванов Иванович Иван",
        email: "blablabla@mail.ru",
        password: "asdasasasdas",
      },
    ] as TypeStylists[],
  },
  reducers: {
    setStylists: (state, action: PayloadAction<any>) => ({
      ...state,
      stylists: action.payload,
    }),
  },
});

export const stylistsThunks = {
  getStylists: () => async (dispatch: TypeDispatch) => {
    // const response = await axiosInstance.get("/api/stylists");
    // dispatch(setStylists(response?.data));
  },
  removeStylist: (id: number) => async (dispatch: TypeDispatch) => {
    // await axiosInstance.delete(`/api/stylists/${id}`);
    dispatch(stylistsThunks.getStylists());
  },
};

export const { setStylists } = stylistsPageSlice.actions;
export default stylistsPageSlice.reducer;
