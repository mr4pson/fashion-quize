import { configureStore } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import blocksPageSlice from "./slicers/blocksPageSlice";
import questionsPageSlice from "./slicers/questionsPageSlice";
import quizePageSlice from "./slicers/quizePageSlice";
import stylistsPageSlice from "./slicers/stylistsPageSlice";

const store = configureStore({
  reducer: {
    quizePage: quizePageSlice,
    blocksPage: blocksPageSlice,
    questionsPage: questionsPageSlice,
    stylistsPage: stylistsPageSlice,
  },
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type TypeDispatch = Dispatch<any>;

export default store;
