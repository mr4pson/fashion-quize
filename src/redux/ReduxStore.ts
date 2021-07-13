import { configureStore } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import blocksPageSlice from "./slicers/blocksPageSlice";
import questionsPageSlice from "./slicers/questionsPageSlice";
import quizePageSlice from "./slicers/quizePageSlice";
import stylistsPageSlice from "./slicers/stylistsPageSlice";
import tasksPageSlice from "./slicers/tasksPageSlice";

const store = configureStore({
  reducer: {
    quizePage: quizePageSlice,
    blocksPage: blocksPageSlice,
    questionsPage: questionsPageSlice,
    stylistsPage: stylistsPageSlice,
    tasksPage: tasksPageSlice,
  },
});

export type TypeRootState = ReturnType<typeof store.getState>;
// const useAppDispatch = () => useDispatch();
export type TypeDispatch = Dispatch<any>;

export default store;
