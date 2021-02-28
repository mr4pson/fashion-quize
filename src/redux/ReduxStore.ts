import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import quizePageReducer from "./reducers/QuizePage.reducer";

const reducers = combineReducers({
    quizePage: quizePageReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;