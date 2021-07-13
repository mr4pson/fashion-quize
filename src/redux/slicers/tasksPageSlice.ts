import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "components/pages/AdminPage/constants";
import { TypeTask } from "components/pages/StylistPage/TasksPage/types";
import { TypeDispatch } from "redux/ReduxStore";

const tasksPageSlice = createSlice({
  name: "tasksPage",
  initialState: {
    tasks: [] as TypeTask[],
    task: {} as TypeTask,
  },
  reducers: {
    setTasks: (state, action: PayloadAction<TypeTask[]>) => ({
      ...state,
      tasks: action.payload,
    }),
    setTask: (state, action: PayloadAction<TypeTask>) => ({
      ...state,
      task: action.payload,
    }),
  },
});

export const tasksThunks = {
  getTasks: () => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get("/api/tasks");
    dispatch(setTasks(response?.data));
  },
  getTask: (id: number) => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get(`/api/tasks/${id}`);
    dispatch(setTask(response?.data));
  },
}

export const { setTasks, setTask } = tasksPageSlice.actions;
export default tasksPageSlice.reducer;
