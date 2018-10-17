import { loginReducers } from "reducers/loginReducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export default function configureStore(initialState) {
  const store = createStore(loginReducers, applyMiddleware(thunk));
  return store;
}
