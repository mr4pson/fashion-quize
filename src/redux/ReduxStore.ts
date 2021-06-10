import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import blocksPageReducer from "./reducers/blocksPageReducer";
import questionsPageReducer from "./reducers/questionsPageReducer";
import quizePageReducer from "./reducers/quizePageReducer";

const reducers = combineReducers({
  quizePage: quizePageReducer,
  blocksPage: blocksPageReducer,
  questionsPage: questionsPageReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

type TypeRootReducer = typeof reducers;
export type TypeDispatch = typeof store.dispatch;
export type TypeAppState = ReturnType<TypeRootReducer>;
export type InferThunksType<A extends Action = Action, R = Promise<void>> =
  ThunkAction<R, TypeAppState, unknown, A>;
export type InferActionsType<T> = T extends {
  [key: string]: (...args: any) => infer U;
}
  ? U
  : never;

export default store;
