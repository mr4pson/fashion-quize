import { configureStore } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";

import blocksPageSlice from "./slicers/blocksPageSlice";
import compilationsPageSlice from "./slicers/compilationsPageSlice";
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
    compilationsPage: compilationsPageSlice,
  },
});

export const useAppDispatch = () => useDispatch<TypeDispatch>();

export type TypeRootState = ReturnType<typeof store.getState>;
export type TypeDispatch = Dispatch<any>;

export default store;
