import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { axiosInstance } from "components/pages/AdminPage/consts";
import { TUser } from "components/pages/StylistPage/TasksPage/types";
import { TypeDispatch } from "redux/ReduxStore";

const usersPageSlice = createSlice({
  name: "usersPage",
  initialState: {
    users: [] as TUser[],
    user: {} as TUser,
    loading: false as boolean,
  },
  reducers: {
    setUsers: (state, action: PayloadAction<TUser[]>) => ({
      ...state,
      users: action.payload,
    }),
    setUser: (state, action: PayloadAction<TUser>) => ({
      ...state,
      user: action.payload,
    }),
    setLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loading: action.payload,
    }),
  },
});

export const usersThunks = {
  getUsers: () => async (dispatch: TypeDispatch) => {
    dispatch(setLoading(true));
    const response = await axiosInstance.get("/api/users");
    dispatch(setUsers(response?.data));
    dispatch(setLoading(false));
  },
  getUser: (id: number) => async (dispatch: TypeDispatch) => {
    dispatch(setLoading(true));
    const response = await axiosInstance.get(`/api/users/${id}`);
    dispatch(setUser(response?.data));
    dispatch(setLoading(false));
  },
  getStylistUsers: () => async (dispatch: TypeDispatch) => {
    dispatch(setLoading(true));
    const response = await axiosInstance.get("/api/users/stylist-users");
    dispatch(setUsers(response?.data));
    dispatch(setLoading(false));
  },
  clearUsers: () => (dispatch: TypeDispatch) => {
    dispatch(setUsers([]));
  },
  clearUser: () => (dispatch: TypeDispatch) => {
    dispatch(setUser({} as TUser));
  },
};

export const { setUsers, setUser, setLoading } = usersPageSlice.actions;
export default usersPageSlice.reducer;
