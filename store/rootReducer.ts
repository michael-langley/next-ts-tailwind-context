import { combineReducers, Action, Reducer } from 'redux';
import { AppState } from 'trhc-sample';
import auth from './modules/auth';

const rootReducer: Reducer<AppState, Action> = combineReducers({
  auth,
});

export default rootReducer;
