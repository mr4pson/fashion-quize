import { configureStore } from "@reduxjs/toolkit";
import blocksPageSlice from "./reducers/blocksPageSlice";
import questionsPageSlice from "./reducers/questionsPageSlice";
import quizePageSlice from "./reducers/quizePageSlice";

const store = configureStore({
  reducer: {
    quizePage: quizePageSlice,
    blocksPage: blocksPageSlice,
    questionsPage: questionsPageSlice,
  },
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type TypeDispatch = typeof store.dispatch;

export default store;
