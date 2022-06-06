import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { openNotification } from "common/helpers/common-helpers";
import { axiosInstance } from "components/pages/AdminPage/consts";
import { TaskStatus, TaskType, TypeTask } from "components/pages/StylistPage/TasksPage/types";
import { TypeDispatch } from "redux/ReduxStore";

const itemsNumber = 9;

const tasksPageSlice = createSlice({
  name: "tasksPage",
  initialState: {
    tasks: [] as TypeTask[],
    visibleTasks: [] as TypeTask[],
    isIncreasePageBtnVisible: false,
    page: 0,
    task: {} as TypeTask,
    types: [] as TaskType[],
    statuses: [] as TaskStatus[],
    loading: false as boolean,
  },
  reducers: {
    setTasks: (state, action: PayloadAction<TypeTask[]>) => ({
      ...state,
      tasks: action.payload.reverse(),
    }),
    increasePageNumber: (state) => {
      const currentPage = state.page + 1;
      const visibleTasks = state.tasks.slice(0, currentPage * itemsNumber);
      const isIncreasePageBtnVisible = visibleTasks.length < state.tasks.length;
      return {
        ...state,
        page: currentPage,
        visibleTasks,
        isIncreasePageBtnVisible,
      }
    },
    resetPageNumber: (state) => ({
      ...state,
      visibleTasks: [],
      page: 0,
      isIncreasePageBtnVisible: false,
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
    setLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loading: action.payload,
    }),
  },
});

export const tasksThunks = {
  getTasks: () => async (dispatch: TypeDispatch) => {
    dispatch(setLoading(true));
    const response = await axiosInstance.get("/tasks");
    dispatch(setTasks(response?.data));
    dispatch(setLoading(false));
  },
  getUserTasks: () => async (dispatch: TypeDispatch) => {
    dispatch(setLoading(true));
    const response = await axiosInstance.get("/tasks/user-tasks");
    await dispatch(setTasks(response?.data));
    dispatch(increasePageNumber());
    dispatch(setLoading(false));
  },
  getStylistTasks: () => async (dispatch: TypeDispatch) => {
    dispatch(setLoading(true));
    const response = await axiosInstance.get("/tasks/stylist-tasks");
    dispatch(setTasks(response?.data));
    dispatch(setLoading(false));
  },
  increaseTaskPage: () => async (dispatch: TypeDispatch) => {
    dispatch(increasePageNumber());
  },
  resetPageNumber: () => async (dispatch: TypeDispatch) => {
    dispatch(resetPageNumber());
  },
  clearTasks: () => (dispatch: TypeDispatch) => {
    dispatch(setTasks([]));
  },
  getTask: (id: number) => async (dispatch: TypeDispatch) => {
    dispatch(setLoading(true));
    const response = await axiosInstance.get(`/tasks/${id}`);
    dispatch(setTask(response?.data));
    dispatch(setLoading(false));
  },
  clearTask: () => (dispatch: TypeDispatch) => {
    dispatch(setTask({} as TypeTask));
  },
  getTaskStatuses: () => async (dispatch: TypeDispatch) => {
    dispatch(setLoading(true));
    const response = await axiosInstance.get("/task-statuses");
    dispatch(setTaskStatuses(response?.data));
    dispatch(setLoading(false));
  },
  getTaskTypes: () => async (dispatch: TypeDispatch) => {
    dispatch(setLoading(true));
    const response = await axiosInstance.get("/task-types");
    dispatch(setTaskTypes(response?.data));
    dispatch(setLoading(false));
  },
  updateTask: (id: number, payload: any) => async () => {
    const response = await axiosInstance.put(`/tasks/${id}`, payload);
    if (!(response && response.status === 200)) {
      openNotification("error", `Не удалось обновить задачу`);
    }
  },
  createTask: (payload: any) => async () => {
    const response = await axiosInstance.post(`/tasks`, payload);
    if (!(response && response.status === 201)) {
      openNotification("error", `Не удалось создать задачу`);
    }
  },
  cancelTask: (id: number) => async (dispatch: TypeDispatch) => {
    const response = await axiosInstance.delete(`/tasks/${id}`);
    dispatch(tasksThunks.getUserTasks());
    if (!(response && response.status === 200)) {
      openNotification("error", `Не удалось отменить задачу`);
    }
  },
};

export const { setTasks, setTask, setTaskStatuses, setTaskTypes, setLoading, increasePageNumber, resetPageNumber } = tasksPageSlice.actions;
export default tasksPageSlice.reducer;
