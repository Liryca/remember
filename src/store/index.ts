import { legacy_createStore as createStore, applyMiddleware, AnyAction} from 'redux'
import { dictionaryReducer } from './reducers/dictionaryReduser';
import { combineReducers } from "redux";
import { useDispatch as useDispatchOriginal } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

 const rootReducer = combineReducers({
   dictionary:dictionaryReducer
})

// const thunk: Middleware = (storeApi) => (next) => (action) => {
//   if (typeof action === "function") {
//     return action(storeApi.dispatch, storeApi.getState);
//   }
//   return next(action);
// }

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof rootReducer>
type AppDispatch = ThunkDispatch<RootState, any, AnyAction>; 
export const useDispatch: () => AppDispatch = useDispatchOriginal;
// https://stackoverflow.com/questions/59800913/type-safe-usedispatch-with-redux-thunk
