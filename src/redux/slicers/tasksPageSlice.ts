import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { openNotification } from "common/helpers/common-helpers";
import { axiosInstance } from "components/pages/AdminPage/constants";
import { TaskStatus, TaskType, TypeTask } from "components/pages/StylistPage/TasksPage/types";
import { TypeDispatch } from "redux/ReduxStore";

const tasksPageSlice = createSlice({
  name: "tasksPage",
  initialState: {
    tasks: [] as TypeTask[],
    task: {} as TypeTask,
    types: [] as TaskType[],
    statuses: [] as TaskStatus[],
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
    setTaskTypes: (state, action: PayloadAction<TaskType[]>) => ({
      ...state,
      types: action.payload,
    }),
    setTaskStatuses: (state, action: PayloadAction<TaskStatus[]>) => ({
      ...state,
      statuses: action.payload,
    }),
  },
});

export const tasksThunks = {
  getTasks: () => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get("/api/tasks");
    dispatch(setTasks(response?.data));
  },
  clearTasks: () => (dispatch: TypeDispatch) => {
    dispatch(setTasks([]));
  },
  getTask: (id: number) => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get(`/api/tasks/${id}`);
    dispatch(setTask(response?.data));
  },
  clearTask: () => (dispatch: TypeDispatch) => {
    dispatch(setTask({} as TypeTask));
  },
  getTaskStatuses: () => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get("/api/task-statuses");
    dispatch(setTaskStatuses(response?.data));
  },
  getTaskTypes: () => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.get("/api/task-types");
    dispatch(setTaskTypes(response?.data));
  },
  updateTask: (id: number, payload: any) => async () => {
    const response = await axiosInstance.put(`/api/tasks/${id}`, payload);
    if (!(response && response.status === 200)) {
      openNotification("error", `Не удалось обновить задачу`);
    }
  },
};

export const { setTasks, setTask, setTaskStatuses, setTaskTypes } = tasksPageSlice.actions;
export default tasksPageSlice.reducer;
